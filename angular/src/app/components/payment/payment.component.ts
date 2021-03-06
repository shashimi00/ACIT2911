import { Component, OnInit, ɵConsole } from '@angular/core';
// import { Meta} from '@angular/platform-browser'; 
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  _http: HttpClient;
  _errorMessage: String = "";
  orders: Array<any>;
  cart: Array<any>
  total: any
  success = false;
  failure = false
  codes = ["Maxwell", "Harsimran", "AleafVsShabnam", "SJPark","Angela","Taz" ]

  constructor(private eventEmitterService: EventEmitterService, private http: HttpClient) {
    this._http = http;
    this.getAllOrders();
    this.orders = [];
    this.cart = []
    this.total = 0
  }

  ngOnInit() {
  }

  clearPromo() {
    this.success = false
    this.failure = false
  }

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

onEnter(value){
  // this.total()
    this.clearPromo()
  for (var i=0;i<this.codes.length;i++){
        if (this.codes[i] == value){
          const index = this.codes.indexOf(value)
          // if (index> -1){
              this.codes.splice(index, 1) 
    this.total = 0.98*this.total
    this.success=true
    }
  }
  if (this.success == false) {
    this.failure = true
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

  cartTotal() {
    this.total = 0
    this.cart.forEach(item => {
    this.total = this.total + (item.qty * item.price)
    })
  }

  deleteProduct(_id) {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
      "body": { _id:_id}
    };
  
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

  checkout() {
    // this.gtAllOrders()
    for (var i = 0; i < this.orders.length; i++) {
    this.deleteProduct(this.orders[i]._id)
    console.log("Done")
    } 
    window.location.href = "http://localhost:4200/shoppingCart";
  }

  validate(){
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

