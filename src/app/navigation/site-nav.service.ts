import { Injectable } from '@angular/core';

export interface SiteLink {
  route: string;
  text: string;
  icon: string;
  hideIfAuth: boolean
}

@Injectable()
export class SiteNavService {
  private links: SiteLink[] = [
    { 
      route: '/signup',
      text: 'Sign-up',
      icon: 'person_add',
      hideIfAuth: true
    },
    { 
      route: '/login',
      text: 'Login',
      icon: 'input',
      hideIfAuth: true
    },
    { 
      route: '/training',
      text: 'Training',
      icon: 'directions_run',
      hideIfAuth: false
    }
  ]
  constructor() { }

  get(): any[] {
    return this.links;
  }
}
