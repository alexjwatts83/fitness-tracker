import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
  ui: fromUi.State;
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer
};

//ui
export const getUiState = createFeatureSelector<fromUi.State>(fromUi.STATE_NAME);
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

// auth
export const getAuthState = createFeatureSelector<fromAuth.State>(fromAuth.STATE_NAME);
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);