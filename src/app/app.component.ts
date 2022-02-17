import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Setup the side nav items with a label and a route, this will be used in the
  // template to create our menu items and set up the routerLink on them
  sideNavItems: { label: string; route: string[] }[] = [
    {
      label: 'Home',
      route: ['/'],
    },
    {
      label: 'Favourites',
      route: ['/favourites'],
    },
  ];
}
