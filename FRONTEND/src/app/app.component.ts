import { Component } from '@angular/core';
import { Link } from './core/model/Link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web-app';
  navLinks: Link[] = [
    {
      label: 'Welcome',
      link: '',
      index: 0
    },
    {
      label: 'Création client',
      link: 'client-form',
      index: 1
    },
    {
      label: 'Catalogue',
      link: 'catalog',
      index: 2
    }
  ];
}
