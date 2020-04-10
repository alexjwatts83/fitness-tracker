import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteNavService {
  private links = [
    { 
      route: '/signup',
      text: 'Sign-up',
      icon: 'person_add'
    },
    { 
      route: '/login',
      text: 'Login',
      icon: 'input'
    },
    { 
      route: '/training',
      text: 'Training',
      icon: 'directions_run'
    }
  ]
  constructor() { }

  get(): any[] {
    return this.links;
  }
}
