import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger.service'
// import { Product } from 'src/app/models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitterService } from 'src/app/services/event-emitter.service'; 

const BASE_URL = "http://localhost:1337/Product/";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  _http:HttpClient;
  _errorMessage:String = "";

  cartItems = [];
  codes = ["Maxwell", "Harsimran", "AleafVsShabnam", "SJPark","Angela","Taz" ]
  cartTotal = 0
  success = false;
  failure = false
  order="";


  constructor(private msg: MessengerService, private http: HttpClient, private eventEmitterService: EventEmitterService    
    ) {
    this._http = http;
    this.order = ""
   }

  ngOnInit() {
    this.msg.getMsg().subscribe((product) => {
      this.addProductToCart(product)
    })

  }

  clearPromo() {
    this.success = false
    this.failure = false
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
     if (product.qty == 0){
       this.cartItems.slice()
       const index = this.cartItems.indexOf(product)
        this.cartItems.splice(index, 1)
     }

    this.total()
    // this.submitOrder(product)
  }

  total() {
    this.cartTotal = 0
    this.cartItems.forEach(item => {
    this.cartTotal += (item.qty * item.price)
    })
  }

  removeItem(item) {

    const index = this.cartItems.indexOf(item)
        this.cartItems.splice(index, 1)
  
    this.total()
    this.deleteProduct(item._id)
}

onEnter(value){
  this.total()
    this.clearPromo()
  for (var i=0;i<this.codes.length;i++){
        if (this.codes[i] == value){
          const index = this.codes.indexOf(value)
          // if (index> -1){
              this.codes.splice(index, 1) 
    this.cartTotal -= 0.02*this.cartTotal
    this.success=true
    }
  }
  if (this.success == false) {
    this.failure = true
  }
}

deleteProduct(_id) {

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
    "body": { _id:_id}
  };

  let url = BASE_URL + "Delete"
  this.http.delete(  url , httpOptions) 
  .subscribe(
      // Data is received from the post request.
      (data) => {
          this._errorMessage = data["errorMessage"];
          // this.getAllProducts(); 
      },
      // An error occurred. Data is not received. 
      error  => {
        this._errorMessage = error; 
      });
}


  submitOrder(order) {
    // This free online service receives post submissions.
    this.http.post("http://localhost:1337/Order/Submit",
    { name: order.productName, price: order.price, qty: 0})
    // {cart: this.cartItems, total:this.cartTotal})
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
