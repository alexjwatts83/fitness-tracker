import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/dialogs/confirm/confirm.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number;
  timer: any;
  message: string;

  constructor(public dialog: MatDialog) { 
    this.progress = 0;
    this.message = 'keep it 100';
  }

  ngOnInit(): void {
    this.timer = setInterval(()=>{
      this.progress += 25;
      if (this.progress >= 100) {
        this.stopInterval('Exercised finished');
      }
    }, 1000);
  }

  onStopClicked() {
    this.stopInterval('You stopped it');
    this.dialog.open(ConfirmComponent);
  }

  stopInterval(msg: string) {
    this.message = msg;
    clearInterval(this.timer);
  }
}
