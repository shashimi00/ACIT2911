import { Component, OnInit } from '@angular/core';
import { CartComponent} from './cart/cart.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  _http:HttpClient;

  constructor(private http: HttpClient) {
    this._http = http;
   }

  ngOnInit() {
  }

}
