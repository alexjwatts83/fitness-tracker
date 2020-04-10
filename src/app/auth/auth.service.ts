import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  authChanged = new Subject<boolean>();

  constructor() {
    this.user =null; 
  }

  register(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    console.log(this.user);
    this.setAuthChanged(true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    console.log(this.user);
    this.setAuthChanged(true);
  }

  logout() {
    this.user = null;
    this.setAuthChanged(false);
  }

  private setAuthChanged(isAuth: boolean) {
    this.authChanged.next(isAuth);
  }

  getUser() {
    return { ...this.user };
  }

  isAuthenticated() {
    return this.user === null;
  }
}