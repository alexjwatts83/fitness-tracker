import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Exercise>;
  displayedColumns: string[] = [
    'state',
    'date',
    'time',
    'name',
    'duration',
    'calories',
  ];
  pageSizeOptions: number[];
  filterHeader: string[] = ['filter'];

  private pastExercisesChanged$: Subscription;
  private pastExercises$ = new Observable<Exercise[]>();

  constructor(
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {
    this.pageSizeOptions = [5, 10, 20];
    this.dataSource = new MatTableDataSource<Exercise>([]);
  }

  ngOnInit(): void {
    this.pastExercises$ = this.store.select(fromTraining.getFinishedExercises);

    this.pastExercises$.subscribe((dbExercises: any[]) => {
      let exercises = dbExercises.map((e: any) => {
        return {
          ...e,
          date: e.date.toDate(),
        };
      });
      this.dataSource.data = exercises;
    });

    this.trainingService.fetchPastExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    if (this.pastExercisesChanged$) {
      this.pastExercisesChanged$.unsubscribe();
    }
  }

  filterList(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
