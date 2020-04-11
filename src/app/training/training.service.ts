import { Exercise } from './exercise.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UiService } from '../shared/ui.service';

@Injectable()
export class TrainingService implements OnDestroy {
  private availableExercisesCollection: AngularFirestoreCollection<Exercise>;
  private availableExercises: Exercise[];
  private runningExercise: Exercise;

  exercisesChanged = new Subject<Exercise[]>();
  exerciseChanged = new Subject<Exercise>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  fbSubs: Subscription[] = [];

  constructor(private readonly afs: AngularFirestore, private uiService: UiService) {
  }

  ngOnDestroy() {
    // this.cancelSubscriptions()
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fetchAvailableExercises() {
    console.log('fetchAvailableExercises');
    this.uiService.loadingStateChanged.next(true);
    this.sleep(2000).then(() => { console.log("World!"); this.doStuff(); });
    
    // this.fbSubs.push(this.db
    //   .collection('availableExercises')
    //   .snapshotChanges()
    //   .map(docArray => {
    //     return docArray.map(doc => {
    //       return {
    //         id: doc.payload.doc.id,
    //         name: doc.payload.doc.data()['name'],
    //         duration: doc.payload.doc.data()['duration'],
    //         calories: doc.payload.doc.data()['calories']
    //       };
    //     });
    //   })
    //   .subscribe((exercises: Exercise[]) => {
    //     this.availableExercises = exercises;
    //     this.exercisesChanged.next([...this.availableExercises]);
    //   }));
  }

  doStuff() {
    console.log('doStuff');
    this.availableExercisesCollection = this.afs.collection<Exercise>('AvailableExercises');

      this.fbSubs.push(this.availableExercisesCollection
        .snapshotChanges()
        .subscribe(response => {
          this.availableExercises = response.map((x: any) => {
            const data = x.payload.doc.data() as Exercise;
            const id = x.payload.doc.id;
            return { 
              id,
              ...data 
            };
          });
          console.log('snapshotChanges');
          this.exercisesChanged.next([...this.availableExercises]);
          this.uiService.loadingStateChanged.next(false);
        },
        ((error: any) => {
          // console.log(error);
          this.uiService.loadingStateChanged.next(false);
        }),
        ()=> {
          console.log('complete');
          console.log('fetchAvailableExercises finished');
        })
      );
  }

  cancelSubscriptions() {
    console.log('cancelSubscriptions called');
    this.fbSubs.forEach(x=>x.unsubscribe());
  }

  startExercise(exerciseId: string) {
    const exercise = this.availableExercises.find((x: Exercise) => x.id === exerciseId);
    this.runningExercise = exercise;
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.addExerciseToPastExercises({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addExerciseToPastExercises({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchPastExercises() {
    this.fbSubs.push(this.afs
      .collection('PastExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  addExerciseToPastExercises(exercise: Exercise) {
    this.afs
      .collection('PastExercises')
      .add(exercise)
        .then((response: any) => {
          console.debug(response);
        }).catch((err: any) => {
          console.error(err);
        });
  }
}