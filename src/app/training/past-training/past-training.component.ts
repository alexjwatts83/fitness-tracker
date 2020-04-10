import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit {
  dataSource: MatTableDataSource<Exercise>;
  displayedColumns: string[] = ['state', 'date','time','name','duration','calories'];

  constructor(private trainingService: TrainingService) { 
    this.dataSource = new MatTableDataSource<Exercise>([]);
  }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getPastExercises();
  }
}
