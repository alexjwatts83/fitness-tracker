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

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exercisedChanged$ = this.trainingService.exerciseChanged
      .subscribe((exercise: Exercise) => {
        
        this.ongoingTraining = (exercise != null);
        console.log('exercisedChanged called', exercise, this.ongoingTraining);
      });
  }

  ngOnDestroy(): void {
    this.exercisedChanged$.unsubscribe();
  }

  startTraining(data: any) {
    this.trainingService.startExercise(data);
  }

  finishTraining() {
    console.log('finishTraining');
    this.trainingService.startExercise(null);
  }
}
