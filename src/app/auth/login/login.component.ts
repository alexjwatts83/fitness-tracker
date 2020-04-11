import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading: boolean;
  private loading$ = new Subscription();

  constructor(private authService: AuthService, private uiService: UiService) { 
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { validators: [Validators.required] })
    });

    this.loading$ = this.uiService.getLoadingStateSubject().subscribe((res: boolean) => {
      this.isLoading = res;
    })
  }

  ngOnDestroy(): void {
    if (this.loading$){
      this.loading$.unsubscribe();
    }
  }

  onSubmit() {
    console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
