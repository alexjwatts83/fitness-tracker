import { Component, OnInit, OnDestroy } from '@angular/core';
import { SiteNavService, SiteLink } from './navigation/site-nav.service';
import { AuthService } from './auth/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  links: SiteLink[];
  private authSub$: Subscription;
  isAuth$: Observable<boolean>;
  constructor(
      private service: SiteNavService,
      private authService: AuthService,
      private store: Store<fromRoot.State>){
    // this.isAuth = false;
    // this.links = this.getLinks(!(this.isAuth | async));
  }

  ngOnInit(): void {
    this.authService.initAuthListener();
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
    this.authSub$ = this.isAuth$.subscribe((authStatus: boolean) => {
      console.log('authStatus: ' + authStatus)
      this.links = this.getLinks(!authStatus);
    });
  }

  ngOnDestroy(): void {
    if (this.authSub$) {
      this.authSub$.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }

  getLinks(hideIfAuth: boolean) {
    return this.service.get().filter((x: SiteLink) => x.hideIfAuth === hideIfAuth);
  }
}
