import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/app/core/actions/ProductAction';
import { Product } from 'src/app/core/model/product';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class DisplayCatalogComponent implements OnInit {
  products: Product[];
  search = new FormControl('');

  constructor(private dataService: DataService, private store: Store) {
  }

  ngOnInit(): void {
    this.getCatalogueObject();

  }

  getCatalogueObject() {
    this.dataService.getCatalogues().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateList(event: Product[]) {
    this.products = event;
  }

  addToShoppingList(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

}
