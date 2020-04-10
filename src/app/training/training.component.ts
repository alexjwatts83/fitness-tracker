import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs';
import { Exercise } from './exercise.model';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining = false;
  exercisedChanged$: Subscription;
  exercises: Exercise[];
  exercise: Exercise;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exercises = this.trainingService.getAll();

    this.exercisedChanged$ = this.trainingService.exerciseChanged
      .subscribe((exercise: Exercise) => {
        console.log({
          exercise: exercise
        });
        this.ongoingTraining = (exercise != null);
        this.exercise = exercise;
      });
  }

  ngOnDestroy(): void {
    this.exercisedChanged$.unsubscribe();
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
