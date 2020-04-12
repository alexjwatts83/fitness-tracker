import { Exercise } from './exercise.model';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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

  fbSubs: Subscription[] = [];

  constructor(
    private readonly afs: AngularFirestore,
    private uiService: UiService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnDestroy() {}

  fetchAvailableExercises() {
    this.store.dispatch(new uiActions.StartLoading());
    this.fetchAvailableExercisesFromDb();
  }

  private fetchAvailableExercisesFromDb() {
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
          this.store.dispatch(new uiActions.StopLoading());
          this.store.dispatch(
            new trainingActions.SetAvailableTrainings([...availableExercises])
          );
        },
        (error: any) => {
          console.warn(error);
          this.store.dispatch(new uiActions.StopLoading());
          this.uiService.openSnackBar(
            'Fetching Exercises failed, please try again later'
          );
          this.store.dispatch(new trainingActions.SetAvailableTrainings(null));
        }
      )
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((x) => x.unsubscribe());
  }

  startExercise(exerciseId: string) {
    this.store.dispatch(new trainingActions.SetStartTraining(exerciseId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((excercise) => {
        this.addExerciseToPastExercises({
          ...excercise,
          date: new Date(),
          state: 'completed',
        });
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe((excercise) => {
        this.addExerciseToPastExercises({
          ...excercise,
          duration: excercise.duration * (progress / 100),
          calories: excercise.calories * (progress / 100),
          date: new Date(),
          state: 'cancelled',
        });
      });
  }

  fetchPastExercises() {
    this.fbSubs.push(
      this.afs
        .collection('PastExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(
              new trainingActions.SetFinishedTrainings(exercises)
            );
          },
          (error: any) => {
            this.store.dispatch(new uiActions.StopLoading());
            this.uiService.openSnackBar(
              'Fetching Exercises failed, please try again later'
            );
          }
        )
    );
  }

  addExerciseToPastExercises(exercise: Exercise) {
    this.store.dispatch(new uiActions.StartLoading());
    this.afs
      .collection('PastExercises')
      .add(exercise)
      .then((response: any) => {
        this.store.dispatch(new trainingActions.SetStopTraining());
        this.uiService.openSnackBar('Saving exercise success');
        this.store.dispatch(new uiActions.StopLoading());
      })
      .catch((err: any) => {
        console.warn(err);
        this.store.dispatch(new uiActions.StopLoading());
        this.uiService.openSnackBar('Saving exercise to db failed');
      });
  }
}
