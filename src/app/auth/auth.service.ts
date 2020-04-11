import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable()
export class AuthService {
  // private user: User;
  authChanged = new Subject<boolean>();
  private isAuthd: boolean;
  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.isAuthd = false;
  }

  register(authData: AuthData) {
    let prom = this.afAuth.createUserWithEmailAndPassword(authData.email,authData.password);
    prom
      .then(result => {
        console.log({regAuth: result});
        this.setAuthChanged(true);
      })
      .catch(err => {
        console.error(err);
      });
  }

  login(authData: AuthData) {
    let prom = this.afAuth.signInWithEmailAndPassword(authData.email,authData.password);
    prom
      .then(result => {
        console.log({regAuth: result});
        this.setAuthChanged(true);
      })
      .catch(err => {
        console.error(err);
      });
  }

  logout() {
    // this.user = null;
    // this.setAuthChanged(false);
    this.afAuth.signOut();
    this.setAuthChanged(false);
  }

  private setAuthChanged(isAuth: boolean) {
    this.authChanged.next(isAuth);
    this.isAuthd = isAuth;
    if (isAuth){
      this.router.navigate(['/training']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  // getUser() {
  //   return { ...this.user };
  // }

  isAuthenticated() {
    return this.isAuthd;
  }
}