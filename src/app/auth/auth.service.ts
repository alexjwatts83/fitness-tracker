import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as uiActions from '../shared/ui.actions';
import * as authActions from './auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      console.log({ user: user });
      if (user) {
        this.store.dispatch(new authActions.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/login']);
        this.store.dispatch(new authActions.SetUnauthenticated());
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new uiActions.StartLoading());

    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(new uiActions.StopLoading());
      })
      .catch((error) => {
        console.log(error);
        this.uiService.openSnackBar(error.message);
        this.store.dispatch(new uiActions.StopLoading());
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new uiActions.StartLoading());

    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.store.dispatch(new uiActions.StopLoading());
      })
      .catch((error) => {
        console.log(error);
        this.uiService.openSnackBar(error.message);
        this.store.dispatch(new uiActions.StopLoading());
      });
  }

  logout() {
    console.log('logout called');
    this.afAuth.signOut();
  }
}
