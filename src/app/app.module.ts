import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materials-module';
import { WelcomeComponent } from './welcome/welcome.component';
import {FlexLayoutModule } from '@angular/flex-layout'
import { HeaderComponent, SidenavListComponent } from './navigation';
import { SiteNavService } from './navigation/site-nav.service';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { UiService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AuthModule,
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
