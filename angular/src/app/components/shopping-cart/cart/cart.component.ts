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
orders = []
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
    this.getAllOrders();
   }

  ngOnInit() {
    this.msg.getMsg().subscribe((product) => {
      if (this.cartItems.length==0){
        console.log(0)
        for (var i = 0; i < this.orders.length; i++) {
          this.deleteProduct(this.orders[i]._id)
          console.log("Done")
          } 
      }
      this.addProductToCart(product)
    })

  }

  getAllOrders() {
    let url = 'http://localhost:1337/Order/Index'
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
        this.orders = result.orders;
        console.log(this.orders)
        // this.orders.push({qty:1})
        // this.ManageCart(this.orders)

      },
        error => {
          // Let user know about the error.
          this._errorMessage = error;
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
console.log("done")
  let url = "http://localhost:1337/Order/Delete"
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
