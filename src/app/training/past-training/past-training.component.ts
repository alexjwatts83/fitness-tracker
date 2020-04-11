import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit {
  @ViewChild(MatPaginator, { static:true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Exercise>;
  displayedColumns: string[] = ['state', 'date','time','name','duration','calories'];
  pageSizeOptions: number[];

  constructor(private trainingService: TrainingService) {
    this.pageSizeOptions = [5, 10, 20];
    this.dataSource = new MatTableDataSource<Exercise>([]);
  }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getPastExercises();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterList(event: Event) {
    console.log({event: event});
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
