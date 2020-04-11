import { Exercise } from './exercise.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable()
export class TrainingService implements OnDestroy {
  private availableExercisesCollection: AngularFirestoreCollection<Exercise>;
  private availableExercises: Exercise[];
  private runningExercise: Exercise;

  exercisesChanged = new Subject<Exercise[]>();
  exerciseChanged = new Subject<Exercise>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  fbSubs: Subscription[] = [];

  constructor(private readonly afs: AngularFirestore) {
    this.availableExercisesCollection = afs.collection<Exercise>('AvailableExercises');

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
        this.exercisesChanged.next(this.availableExercises);
      },
      ((error: any) => {
        console.log(error);
      }),
      ()=> {
        console.log('complete');
      })
    );
  }

  ngOnDestroy() {
    this.cancelSubscriptions()
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