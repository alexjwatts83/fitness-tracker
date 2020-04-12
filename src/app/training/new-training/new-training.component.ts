import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Exercise } from '../exercise.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
  @Output() startTraining = new EventEmitter<string>();
  @Output() fetchAgain = new EventEmitter<void>();
  @Input() exercises: Exercise[];

  newExerciseForm: FormGroup;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    this.newExerciseForm = new FormGroup({
      exercise: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onStartTraining() {
    this.startTraining.emit(this.newExerciseForm.value.exercise);
  }

  onFetchAgain() {
    this.fetchAgain.emit();
  }
}
