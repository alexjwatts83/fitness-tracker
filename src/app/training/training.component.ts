import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription, Observable } from 'rxjs';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  private exercisesChanged$: Subscription;
  private exerciseChanged$: Subscription;

  exercises: Exercise[];
  exercise: Exercise;
  
  constructor(
    private trainingService: TrainingService
  ) { 
    console.log('TrainingComponent constructor');
  }

  ngOnInit(): void {
    console.log('TrainingComponent ngOnInit');
    this.trainingService.fetchAvailableExercises();
    this.exercisesChanged$ = this.trainingService
      .exercisesChanged
      .subscribe((data: Exercise[]) => {
        this.exercises = data;
      });

    this.exerciseChanged$ = this.trainingService
      .exerciseChanged
      .subscribe((data: Exercise) => {
        this.exercise = data;
      });
  }

  ngOnDestroy(): void {
    this.exercisesChanged$.unsubscribe();
    this.exerciseChanged$.unsubscribe();
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
}
