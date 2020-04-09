import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDobDate: Date;
  constructor() { }

  ngOnInit(): void {
    this.maxDobDate = new Date();
    this.maxDobDate.setFullYear(this.maxDobDate.getFullYear() - 18);
  }

  onSubmit(f: any) {
    console.log(f);
  }
}
