import * as fromTraining from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availiableExercises: Exercise[];
  finishedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialState: TrainingState = {
  availiableExercises: [],
  finishedExercises: [],
  activeTraining: null,
};

export function trainingReducer(
  state = initialState,
  action: fromTraining.AuthActions
): TrainingState {
  switch (action.type) {
    case fromTraining.SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availiableExercises: action.payload,
      };
    case fromTraining.SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercises: action.payload,
      };
    case fromTraining.SET_START_TRAINING:
      return {
        ...state,
        activeTraining: {
          ...state.availiableExercises.find(
            (x: Exercise) => x.id == action.payload
          ),
        },
      };
    case fromTraining.SET_STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      };
    default:
      return state;
  }
}

export const STATE_NAME = 'training';

export const getTrainingState = createFeatureSelector<TrainingState>(
  STATE_NAME
);

export const getAvailiableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availiableExercises
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercises
);
export const getActiveTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);

export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);
