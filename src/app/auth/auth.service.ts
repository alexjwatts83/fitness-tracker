import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as uiActions from '../shared/ui.actions';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

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
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.startLoading();
    this.store.dispatch(new uiActions.StartLoading());
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.authSuccessfully();
        // this.uiService.finishedLoading();
        this.store.dispatch(new uiActions.StopLoading());
      })
      .catch((error) => {
        console.log(error);
        this.uiService.openSnackBar(error.message);
        // this.uiService.finishedLoading();
      });
  }

  login(authData: AuthData) {
    // this.uiService.startLoading();
    this.store.dispatch(new uiActions.StartLoading());
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log(result);
        this.authSuccessfully();
        // this.uiService.finishedLoading();
        this.store.dispatch(new uiActions.StopLoading());
      })
      .catch((error) => {
        console.log(error);
        this.uiService.openSnackBar(error.message);
        // this.uiService.finishedLoading();
        this.store.dispatch(new uiActions.StopLoading());
      });
  }

  logout() {
    console.log('logout called');
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
