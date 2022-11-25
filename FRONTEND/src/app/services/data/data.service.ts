import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/core/model/Client';
import { Product } from 'src/app/core/model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private client: HttpClient) { }

  getClient(): Client {
    return new Client(
      'Doe', 'John', '1 rue de la paix',
      '75000', 'Paris', 'France',
      '0612345678', 'test@email.fr', 'M',
      'test', 'test', 'test');
  }

  postClient(client: Client) {
    console.log(client);
  }

  //postLogin : return a boolean
  login(login: string, password: string): Observable<any> {
    return this.client.post<any>(environment.apiUrl + "/login", { login: login, password: password });
  }

  //GetCatalogue : return a list of products
  getCatalogues(): Observable<Product[]> {
    return this.client.get<Product[]>(environment.apiUrl + '/product', this.httpOptions);
  }

  getCatalogue(id: number): Observable<Product> {
    return this.client.get<Product>(environment.apiUrl + '/product/' + id, this.httpOptions);
  }
}
