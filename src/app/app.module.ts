import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materials-module';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { 
  TrainingComponent,
  CurrentTrainingComponent,
  NewTrainingComponent,
  PastTrainingComponent } from './training';
import { LoginComponent } from './auth/login/login.component';
import {FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent, SidenavListComponent } from './navigation';
import { SiteNavService } from './navigation/site-nav.service';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';

import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UiService } from './shared/ui.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    LoginComponent,
    HeaderComponent,
    SidenavListComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    SiteNavService,
    AuthService,
    TrainingService,
    UiService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ConfirmComponent
  ]
})
export class AppModule { }
