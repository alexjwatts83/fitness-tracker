import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<string>();

  exercises: Exercise[];
  newExerciseForm: FormGroup;
  constructor(private trainingService: TrainingService) {
    this.exercises = [];
  }

  ngOnInit(): void {
    this.exercises =  this.trainingService.getAll();
    this.newExerciseForm = new FormGroup({
      exercise: new FormControl('', { validators: [Validators.required] })
    })
  }

  onStartTraining() {
    console.log({newExerciseForm: this.newExerciseForm});
    this.startTraining.emit(this.newExerciseForm.value.exercise);
  }
}
