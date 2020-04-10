import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Input() sidenav: any;
  @Input() links: any[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
