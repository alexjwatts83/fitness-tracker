import * as fromActions from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false
}

export function authReducer(state = initialState, action: fromActions.AuthActions): State {
  switch (action.type) {
    case fromActions.SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case fromActions.SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default: 
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;

export const STATE_NAME = 'auth';