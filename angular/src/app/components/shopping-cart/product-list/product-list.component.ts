import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const BASE_URL = "http://localhost:1337/Product/";

import { ProductService } from 'src/app/services/product.service'
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
// export class ProductListComponent implements OnInit {

//   productList: Product[]

//   constructor(private productService: ProductService) { }

//   ngOnInit() {
//     this.productList = this.productService.getProducts()
//   }

// }

export class ProductListComponent{
  _productsArray: Array<any>;
  _http:HttpClient;
  _errorMessage:String = "";

  constructor(private http: HttpClient) {
    this._http = http;
    this.getProducts();
    // this.items = [];  
}

  getProducts() {
    let url = BASE_URL + 'Index'
    this._http.get<any>(url)
        // Get data and wait for result.
        .subscribe(result => {
            this._productsArray = result.products;
            return this._productsArray
        }, 

        error =>{
          // Let user know about the error.
            this._errorMessage = error;
            return this._errorMessage
        })
    
  }
}
