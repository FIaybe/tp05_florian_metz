import { Component, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Link } from 'src/app/core/model/Link';
import { ProductState } from 'src/app/core/state/ProductState';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  connected = localStorage.getItem('connected') === 'true';
  @Input() navLinks: Link[];

  @Select(ProductState.getNbProducts)
  numberProduct$!: Observable<number>;

  logout() {
    localStorage.setItem('connected', 'false');
  }

}
