import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  links = [
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
  ngOnInit(): void {
    
  }
}
