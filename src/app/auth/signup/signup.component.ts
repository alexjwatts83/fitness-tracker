import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDobDate: Date;
  isLoading: boolean;
  private loading$ = new Subscription();
  constructor(private authService: AuthService, private uiService: UiService) { 
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.maxDobDate = new Date();
    this.maxDobDate.setFullYear(this.maxDobDate.getFullYear() - 18);
    this.loading$ = this.uiService.loadingStateChanged.subscribe((res: boolean) => {
      this.isLoading = res;
    })
  }

  ngOnDestroy(): void {
    this.loading$.unsubscribe();
  }


  onSubmit(f: any) {
    this.authService.registerUser({
      email: f.value.email,
      password: f.value.password
    });
  }
}
