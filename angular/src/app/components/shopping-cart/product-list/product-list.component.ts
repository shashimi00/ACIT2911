import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const BASE_URL = "http://localhost:1337/Product/";

import { ProductService } from 'src/app/services/product.service'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})


export class ProductListComponent {
  _productsArray: Array<any>;
  _http: HttpClient;
  _errorMessage: String = "";
  source: string

  constructor(private http: HttpClient) {
    this._http = http;
    this.getProducts();
    this.source = "https://images-na.ssl-images-amazon.com/images/I/51gwvAAo78L._UY395_.jpg"
  }
  ngOnInit() {
  }

  photo() {
    var myloc = new Image();
    myloc.useMap = this.source;
    var img = document.createElement('img')
    img.setAttribute('src', myloc.useMap);
    img.setAttribute('style', "height:149px;width:280px;");
    var place = document.getElementById("photo1")
    place.appendChild(img);
  }

  getProducts() {
    let url = BASE_URL + 'Index'
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
        this._productsArray = result.products;
        return this._productsArray
      },

        error => {
          // Let user know about the error.
          this._errorMessage = error;
          return this._errorMessage
        })

  }
}