import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/app/core/actions/ProductAction';
import { Product } from 'src/app/core/model/product';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id;
  product: Product;
  constructor(private route: ActivatedRoute, private service: DataService, private store: Store) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.service.getCatalogue(this.id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToShoppingList(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }


}
