import { Component, OnInit, Input,  Output, EventEmitter  } from '@angular/core';
import { Product } from 'src/app/models/product'
import { MessengerService } from 'src/app/services/messenger.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  _http:HttpClient;
  _errorMessage:String = "";
  orders=[]


  @Input() productItem: Product
  // @Output() messageEvent = new EventEmitter<string>();

  constructor(private msg: MessengerService, private http: HttpClient) { }

  ngOnInit() {
  }

  handleAddToCart() {
    this.msg.sendMsg(this.productItem)
    this.submitOrder(this.productItem)
  
  }

  // public close() {
  //   this.modalService.destroy();
  // }

  getAllOrders() {
    let url = 'http://localhost:1337/Order/Index'
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
        this.orders = result.orders;
      },
        error => {
          // Let user know about the error.
          this._errorMessage = error;
        })
  }

  submitOrder(order) {
    // This free online service receives post submissions.


    this.http.post("http://localhost:1337/Order/Submit",
    {name: order.productName, price: order.price, qty: 1})
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
  }

  review(name){
    window.location.href = "http://localhost:4200/review";
    // console.log(name)
    this.msg.sendMsg(name)
  }
  
}
