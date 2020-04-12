import { Component, OnInit } from '@angular/core';
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
export class TrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  exercise$: Observable<Exercise>;
  
  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) { }

  ngOnInit(): void {
    this.exercises$ = this.store.select(fromTraining.getAvailiableExercises);
    this.exercise$ = this.store.select(fromTraining.getActiveTraining);

    this.fetchAgain();
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
