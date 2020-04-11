import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TrainingService {
  private availableExercisese: Exercise[];
  private runningExercise: Exercise;
  private exercises: Exercise[];

  exerciseChanged = new Subject<Exercise>();

  constructor() {
    this.exercises = [];
    this.availableExercisese = [
      { id: 'plank', name: 'Plank', duration: 6, calories: 80 },
      { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
      { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
      { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
      { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
    ]
    for(let i = 0; i < this.availableExercisese.length; i++) {
      this.exercises.push({
        ...this.availableExercisese[i],
        date: new Date(),
        state: 'completed'
      });
      let progress = Math.round(Math.random() * 100);
      this.exercises.push({
        ...this.availableExercisese[i],
        duration: this.availableExercisese[i].duration * (progress / 100),
        calories: this.availableExercisese[i].calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      progress = Math.round(Math.random() * 100);
      this.exercises.push({
        ...this.availableExercisese[i],
        duration: this.availableExercisese[i].duration * (progress / 100),
        calories: this.availableExercisese[i].calories * (progress / 100),
        date: new Date(),
        state: null
      });
    }
  }

  getAll() {
    return this.availableExercisese.slice();
  }

  startExercise(exerciseId: string) {
    const exercise = this.availableExercisese.find((x: Exercise) => x.id === exerciseId);
    this.runningExercise = exercise;
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getPastExercises() {
    let newExercises = [...this.exercises];
    
    return newExercises;
  }
}