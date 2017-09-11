import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  selected: any;

  constructor() {
    this.selected = 'overview';
  }

  select(route) {
    this.selected = route;
  }

}
