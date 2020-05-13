import { Component, OnInit, ɵConsole } from '@angular/core';
// import { Meta} from '@angular/platform-browser'; 
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  _http: HttpClient;
  _errorMessage: String = "";
  orders: Array<any>;
  cart: Array<any>
  total: Number

  constructor(private eventEmitterService: EventEmitterService, private http: HttpClient) {
    this._http = http;
    this.getAllOrders();
    this.orders = [];
    this.cart = []
    this.total = 0
  }

  ngOnInit() {

  }

  //   firstComponentFunction(){    
  //     this.eventEmitterService.onFirstComponentButtonClick();    
  //   }  



  getAllOrders() {
    let url = 'http://localhost:1337/Order/Index'
    this._http.get<any>(url)
      // Get data and wait for result.
      .subscribe(result => {
        this.orders = result.orders;
        console.log(this.orders)
        // this.orders.push({qty:1})
        this.ManageCart(this.orders)

      },
        error => {
          // Let user know about the error.
          this._errorMessage = error;
        })
  }

  cartTotal() {
    this.total = 0
    for (var j = 0; j < this.cart.length; j++) {
      console.log(this.cart[j].price)
      this.total+=this.cart[j].price
    }
   
  }


  ManageCart(order) {
    console.log(order)
    for (var i = 0; i < order.length; i++) {
      let exists=false
      for (var j = 0; j < this.cart.length; j++) {
        if (this.cart[j].productName === order[i].name) {
          this.cart[j].qty++
          console.log(this.cart[j].qty)
          exists=true
          break
        }
      }
      if (!exists) {
        console.log(order[i].qty)
        this.cart.push({productName: order[i].name ,price:order[i].price ,qty:1})
      } 

    }
    console.log(this.cart)
this.cartTotal()
  }


  deleteProduct(_id) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
      "body": { _id:_id}
    };
  
    let url = BASE_URL + "Order/Delete"
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

  checkout() {
    this.getAllOrders()
    for (var i = 0; i < this.orders.length; i++) {
    this.deleteProduct(this.orders[i]._id)
    console.log("Done")
    }
    
    window.location.href = "http://localhost:4200/shoppingCart";

  }

  validate(){
    // (function () {
      // 'use strict'
    
      // window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation')
    
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault()
              event.stopPropagation()
            }
            form.classList.add('was-validated')
          }, false)
        })
      
   
  }

}

