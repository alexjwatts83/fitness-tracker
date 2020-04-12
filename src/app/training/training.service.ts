import { Exercise } from './exercise.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training/training.reducer';
import * as uiActions from '../shared/ui.actions';
import * as trainingActions from '../training/training.actions';
import { take } from 'rxjs/operators';

@Injectable()
export class TrainingService implements OnDestroy {
  private availableExercisesCollection: AngularFirestoreCollection<Exercise>;
  // private availableExercises: Exercise[];
  // private runningExercise: Exercise;

  // exercisesChanged = new Subject<Exercise[]>();
  // exerciseChanged = new Subject<Exercise>();
  // finishedExercisesChanged = new Subject<Exercise[]>();

  fbSubs: Subscription[] = [];

  constructor(
    private readonly afs: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnDestroy() {}

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  fetchAvailableExercises() {
    console.log('fetchAvailableExercises');
    this.store.dispatch(new uiActions.StartLoading());

    this.sleep(300).then(() => {
      this.fetchAvailableExercisesFromDb();
    });
  }

  private fetchAvailableExercisesFromDb() {
    console.log('fetchAvailableExercisesFromDb');
    this.availableExercisesCollection = this.afs.collection<Exercise>(
      'AvailableExercises'
    );
    this.fbSubs.push(
      this.availableExercisesCollection.snapshotChanges().subscribe(
        (response) => {
          let availableExercises = response.map((x: any) => {
            const data = x.payload.doc.data() as Exercise;
            const id = x.payload.doc.id;
            return {
              id,
              ...data,
            };
          });
          console.log('snapshotChanges');
          // this.exercisesChanged.next([...this.availableExercises]);
          this.store.dispatch(new uiActions.StopLoading());
          this.store.dispatch(
            new trainingActions.SetAvailableTrainings([
              ...availableExercises
            ])
          );
        },
        (error: any) => {
          // console.log(error);
          this.store.dispatch(new uiActions.StopLoading());
          this.uiService.openSnackBar(
            'Fetching Exercises failed, please try again later'
          );
          // this.exercisesChanged.next(null);
          this.store.dispatch(new trainingActions.SetAvailableTrainings(null));
        },
        () => {
          console.log('complete');
          console.log('fetchAvailableExercises finished');
        }
      )
    );
  }

  cancelSubscriptions() {
    console.log('cancelSubscriptions called');
    this.fbSubs.forEach((x) => x.unsubscribe());
  }

  startExercise(exerciseId: string) {
    // const exercise = this.availableExercises.find(
    //   (x: Exercise) => x.id === exerciseId
    // );
    // this.runningExercise = exercise;
    this.store.dispatch(new trainingActions.SetStartTraining(exerciseId));
    // this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(excercise => {
      this.addExerciseToPastExercises({
        ...excercise,
        date: new Date(),
        state: 'completed',
      });
    });
    // this.addExerciseToPastExercises({
    //   ...this.runningExercise,
    //   date: new Date(),
    //   state: 'completed',
    // });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(excercise => {
      this.addExerciseToPastExercises({
        ...excercise,
        duration: excercise.duration * (progress / 100),
        calories: excercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
    });
    // this.addExerciseToPastExercises({
    //   ...this.runningExercise,
    //   duration: this.runningExercise.duration * (progress / 100),
    //   calories: this.runningExercise.calories * (progress / 100),
    //   date: new Date(),
    //   state: 'cancelled',
    // });
  }

  fetchPastExercises() {
    console.log('fetchPastExercises');
    this.fbSubs.push(
      this.afs
        .collection('PastExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            console.log({fetchPastExercises: exercises});
            // this.finishedExercisesChanged.next([...exercises]);
            this.store.dispatch(
              new trainingActions.SetFinishedTrainings(exercises)
            );
          },
          (error: any) => {
            this.store.dispatch(new uiActions.StopLoading());
            this.uiService.openSnackBar(
              'Fetching Exercises failed, please try again later'
            );
            // this.exercisesChanged.next(null); WHY THIS?????????????
          }
        )
    );
  }

  addExerciseToPastExercises(exercise: Exercise) {
    if (exercise == null) {
      console.warn('addExerciseToPastExercises exercise == null');
      return;
    }
    this.store.dispatch(new uiActions.StartLoading());
    this.afs
      .collection('PastExercises')
      .add(exercise)
      .then((response: any) => {
        console.debug(response);
        // this.runningExercise = null; 
        // this.exerciseChanged.next(null);
        this.store.dispatch(new trainingActions.SetStopTraining());
        this.uiService.openSnackBar('Saving exercise success');
        this.store.dispatch(new uiActions.StopLoading());
      })
      .catch((err: any) => {
        console.error(err);
        this.store.dispatch(new uiActions.StopLoading());
        this.uiService.openSnackBar('Saving exercise to db failed');
      });
  }
}
