import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Observable } from 'rxjs';
import { Exercise } from './exercise.model';

import { Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  // private exercisesChanged$: Subscription;
  // private exerciseChanged$: Subscription;

  exercises$: Observable<Exercise[]>;
  exercise$: Observable<Exercise>;
  
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { 
    console.log('TrainingComponent constructor');
  }

  ngOnInit(): void {
    console.log('TrainingComponent ngOnInit');
    this.fetchAgain();

    this.exercises$ = this.store.select(fromTraining.getAvailiableExercises);
    this.exercise$ = this.store.select(fromTraining.getActiveTraining);

    // this.exercisesChanged$ = this.trainingService
    //   .exercisesChanged
    //   .subscribe((data: Exercise[]) => {
    //     this.exercises = data;
    //     console.log('exercise list received', data);
    //   });

    // this.exerciseChanged$ = this.trainingService
    //   .exerciseChanged
    //   .subscribe((data: Exercise) => {
    //     this.exercise = data;
    //     console.log('single exercise received', data);
    //     if (data === null) {
    //       console.log('checking exercises list');
    //       console.log(this.exercises);
    //     }
    //   });
  }

  ngOnDestroy(): void {
    // if (this.exercisesChanged$){
    //   this.exercisesChanged$.unsubscribe();
    // }
    // if (this.exerciseChanged$){
    //   this.exerciseChanged$.unsubscribe();  
    // }
  }

  startTraining(data: any) {
    this.trainingService.startExercise(data);
  }

  completedTraining() {
    this.trainingService.completeExercise();
  }

  cancelTraining(progress: number) {
    this.trainingService.cancelExercise(progress);
  }

  fetchAgain() {
    this.trainingService.fetchAvailableExercises();
  }
}
