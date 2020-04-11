import { NgModule } from '@angular/core';
// modules
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from '../shared/shared.module';
// components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    AngularFireAuthModule,
    SharedModule
  ],
  exports: [LoginComponent, SignupComponent],
})
export class AuthModule {} {

}