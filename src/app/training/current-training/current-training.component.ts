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
  @Output() exitTraining = new EventEmitter();
  @Input() exercise: Exercise;
  
  progress: number;
  timer: any;
  message: string;
  progressInc: number;
  count: number;
  progressDisplay: number;

  constructor(public dialog: MatDialog) { 
    this.progress = 0;
    this.message = 'keep it one hunid';
    this.count = 0;
  }

  ngOnInit(): void {
    this.progressInc = 100 / this.exercise.duration;
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.message = 'keep it one hunid';
    this.timer = setInterval(()=>{
      this.progress += this.progressInc;
      this.count++;
      console.log({
        progress: this.progress,
        count: this.count
      });
      this.progressDisplay = Math.floor(this.progress);
      if (this.progress >= 100) {
        this.stopInterval('Exercised finished');
      }
    }, 1000);
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
        this.exitTraining.emit();
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
