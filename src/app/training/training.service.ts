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

  ngOnDestroy() {}

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  fetchAvailableExercises() {
    console.log('fetchAvailableExercises');
    this.uiService.startLoading();
    
    this.sleep(200).then(() => { console.log("World!"); this.fetchAvailableExercisesFromDb(); });
  }

  private fetchAvailableExercisesFromDb() {
    console.log('fetchAvailableExercisesFromDb');
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
        this.uiService.finishedLoading();
      },
      ((error: any) => {
        // console.log(error);
        this.uiService.finishedLoading();
        this.uiService.openSnackBar('Fetching Exercises failed, please try again later');
        this.exercisesChanged.next(null);
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
  }

  cancelExercise(progress: number) {
    this.addExerciseToPastExercises({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
  }

  fetchPastExercises() {
    this.fbSubs.push(this.afs
      .collection('PastExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next([...exercises]);
      },
      ((error: any) => {
        this.uiService.finishedLoading();
        this.uiService.openSnackBar('Fetching Exercises failed, please try again later');
        this.exercisesChanged.next(null);
      }))
    );
  }

  addExerciseToPastExercises(exercise: Exercise) {
    this.uiService.startLoading();
    this.afs
      .collection('PastExercises')
      .add(exercise)
        .then((response: any) => {
          console.debug(response);
          this.runningExercise = null;
          this.exerciseChanged.next(null);
          this.uiService.openSnackBar('Saving exercise success');
          this.uiService.finishedLoading();
        }).catch((err: any) => {
          console.error(err);
          this.uiService.finishedLoading();
          this.uiService.openSnackBar('Saving exercise to db failed');
        });
  }
}