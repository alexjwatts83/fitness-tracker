import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDobDate: Date;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.maxDobDate = new Date();
    this.maxDobDate.setFullYear(this.maxDobDate.getFullYear() - 18);
  }

  onSubmit(f: any) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password
    });
  }
}
