import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TrainingService {
  private availableExercisese: Exercise[];
  private runningExercise: Exercise;
  
  exerciseChanged = new Subject<Exercise>();

  constructor() {
    this.availableExercisese = [
      { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
      { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
      { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
      { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
    ]
  }

  getAll() {
    return this.availableExercisese.slice();
  }

  startExercise(exerciseId: string) {
    const exercise = this.availableExercisese.find((x: Exercise) => x.id === exerciseId);
    console.log({
      exercise: exercise,
      exerciseId: exerciseId
    });
    if (exercise !== null) {
      this.runningExercise = exercise;
      console.log({
        runningExercise: this.runningExercise
      });
      this.exerciseChanged.next(this.runningExercise);
    }
  }
}