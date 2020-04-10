import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<void>();

  exercises: Exercise[];
  constructor(private trainingService: TrainingService) {
    this.exercises = [];
  }

  ngOnInit(): void {
    this.exercises =  this.trainingService.getAll();
  }

  onStartTraining() {
    this.startTraining.emit();
  }
}
