import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { SiteLink } from '../site-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() links: SiteLink[];
  @Input() isAuth: boolean;
  @Output() toggleSideNav = new EventEmitter<void>();
  @Output() logoutClicked = new EventEmitter<void>();

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  onLogoutClicked() {
    this.logoutClicked.emit();
    this.onToggleSideNav();
  }
}
