import { Component, OnInit, OnDestroy } from '@angular/core';
import { SiteNavService, SiteLink } from './navigation/site-nav.service';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { UiService } from './shared/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  links: SiteLink[];
  authSub$: Subscription;
  isAuth: boolean;
  constructor(
      private service: SiteNavService,
      private authService: AuthService,
      private uiService: UiService){
    this.isAuth = false;
    this.links = this.getLinks(!this.isAuth);
  }

  ngOnInit(): void {
    this.authService.initAuthListener();
    this.authSub$ = this.authService.authChange.subscribe((authStatus: boolean) => {
      this.isAuth = authStatus;
      console.log('authStatus: ' + authStatus)
      this.links = this.getLinks(!this.isAuth);
    });
  }

  ngOnDestroy(): void {
    this.authSub$.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  getLinks(hideIfAuth: boolean) {
    return this.service.get().filter((x: SiteLink) => x.hideIfAuth === hideIfAuth);
  }
}
