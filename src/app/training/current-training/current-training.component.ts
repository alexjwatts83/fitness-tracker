import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress: number;
  timer: any;
  message: string;
  constructor() { 
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
  }

  stopInterval(msg: string) {
    this.message = msg;
    clearInterval(this.timer);
  }
}
