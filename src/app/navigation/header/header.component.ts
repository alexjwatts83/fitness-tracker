import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() links: any[];
  @Output() toggleSideNav = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }
}
