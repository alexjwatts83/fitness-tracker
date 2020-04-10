import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { 
  ConfirmComponent, 
  ConfirmComponentDialogData 
} from 'src/app/dialogs/confirm/confirm.component';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() completedTraining = new EventEmitter();
  @Output() cancelTraining = new EventEmitter<number>();
  @Input() exercise: Exercise;
  
  progress: number;
  timer: any;
  message: string;
  progressInc: number;
  progressDisplay: number;

  constructor(public dialog: MatDialog) { 
    this.progress = 0;
    this.message = 'keep it one hunid';
  }

  ngOnInit(): void {
    this.progressInc = this.exercise.duration / 100 * 1000;
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.message = 'keep it one hunid';
    this.timer = setInterval(()=>{
      this.progress += 1;
      this.progressDisplay = Math.floor(this.progress);
      if (this.progress >= 100) {
        this.stopInterval('Exercised finished');
        this.completedTraining.emit();
      }
    }, this.progressInc);
  }

  onStopClicked() {
    this.stopInterval('You stopped it');
    var dialogData: ConfirmComponentDialogData = {
      message: `Your current progress is ${this.progress}%`
    }
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('do stuff after close', result);
      if(result) {
        this.cancelTraining.emit(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  stopInterval(msg: string) {
    this.message = msg;
    clearInterval(this.timer);
  }
}
