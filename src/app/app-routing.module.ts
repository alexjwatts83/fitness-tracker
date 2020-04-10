import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent, LoginComponent } from './auth';
import { TrainingComponent } from './training';
import { AuthGaurd } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'training',
    component: TrainingComponent,
    canActivate: [AuthGaurd]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})
export class AppRoutingModule { }
