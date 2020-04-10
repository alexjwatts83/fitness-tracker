import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit {
  dataSource: Exercise[];

  displayedColumns: string[] = ['date','name','state','duration','calories'];

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource = this.trainingService.exercises;
    // console.log(this.dataSource);
  }

}
