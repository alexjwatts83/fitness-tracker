import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { 
  ConfirmComponent, 
  ConfirmComponentDialogData 
} from 'src/app/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() exitTraining = new EventEmitter();

  progress: number;
  timer: any;
  message: string;

  constructor(public dialog: MatDialog) { 
    this.progress = 0;
    this.message = 'keep it 100';
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.message = 'keep it 100';
    this.timer = setInterval(()=>{
      this.progress += 25;
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
