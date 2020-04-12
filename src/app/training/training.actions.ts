import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[TRAINING] SET_AVAILABLE_TRAININGS';
export const SET_FINISHED_TRAININGS = '[TRAINING] SET_FINISHED_TRAININGS';

export const SET_START_TRAINING = '[TRAINING] SET_START_TRAINING';
export const SET_STOP_TRAINING = '[TRAINING] SET_STOP_TRAINING';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {}
}

export class SetStartTraining implements Action {
  readonly type = SET_START_TRAINING;

  constructor(public payload: Exercise) {}
}

export class SetStopTraining implements Action {
  readonly type = SET_STOP_TRAINING;
}

export type AuthActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | SetStartTraining
  | SetStopTraining;
