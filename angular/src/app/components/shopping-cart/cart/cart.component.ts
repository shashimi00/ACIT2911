import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service'
// import { Product } from 'src/app/models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitterService } from 'src/app/services/event-emitter.service'; 

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  _http:HttpClient;
  _errorMessage:String = "";

  cartItems = [
  ];

  cartTotal = 0

  constructor(private msg: MessengerService, private http: HttpClient, private eventEmitterService: EventEmitterService    
    ) {
    this._http = http;
   }

  ngOnInit() {
    this.msg.getMsg().subscribe((product) => {
      this.addProductToCart(product)
    })

    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe(() => {    
        this.submitOrder();    
      });    
    } 
  }

  addProductToCart(product) {

    let productExists = false

    for (let i in this.cartItems) {
      if (this.cartItems[i].productId === product._id) {
        this.cartItems[i].qty++
        productExists = true
        break;
      }
    }

    if (!productExists) {
      this.cartItems.push({
        productId: product._id,
        productName: product.productName,
        qty: 1,
        price: product.price
      })
    }

    this.cartTotal = 0
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

  submitOrder() {
    // This free online service receives post submissions.
    this.http.post("http://localhost:1337/Order/Submit",
    this.cartItems)
.subscribe(
    // Data is received from the post request.
    (data) => {
        // Inspect the data to know how to parse it.
        console.log("POST call successful. Inspect response.", 
                    JSON.stringify(data));
        this._errorMessage = data["errorMessage"];
          
    },
    // An error occurred. Data is not received. 
    error => {
        this._errorMessage = error;                
    });
    // this.clearOrder()
}

}
