import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Exercise } from '../exercise.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<string>();
  @Input() exercises: Exercise[];

  newExerciseForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.newExerciseForm = new FormGroup({
      exercise: new FormControl('', { validators: [Validators.required] })
    })
  }

  onStartTraining() {
    this.startTraining.emit(this.newExerciseForm.value.exercise);
  }
}
