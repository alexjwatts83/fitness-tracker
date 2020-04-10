import { Component, OnInit } from '@angular/core';
import { SiteNavService } from './navigation/site-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  links: any[];

  constructor(private service: SiteNavService){
    this.links = this.service.get();
  }

  ngOnInit(): void {
    
  }
}
