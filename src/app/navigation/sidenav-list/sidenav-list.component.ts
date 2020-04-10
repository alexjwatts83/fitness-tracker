import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Input() links: any[];
  @Output() toggleSideNav = new EventEmitter<void>();
  
  constructor() { }
  
  ngOnInit(): void {
  }

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }
}
