import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() startTraining = new EventEmitter<string>();
  @Input() exercises: Exercise[];

  private isLoadingSub$ =  new Subscription();

  newExerciseForm: FormGroup;
  isLoading: boolean = false;
  
  constructor(
    private uiService: UiService
  ) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.newExerciseForm = new FormGroup({
      exercise: new FormControl('', { validators: [Validators.required] })
    })
    
    this.isLoadingSub$ = this.uiService.loadingStateChanged.subscribe((res: boolean) => {
      console.log('res: ' + res);
      this.isLoading = res;
    });
  }

  ngOnDestroy(): void {
    this.isLoadingSub$.unsubscribe();
  }

  onStartTraining() {
    this.startTraining.emit(this.newExerciseForm.value.exercise);
  }
}
