import { Component, OnInit, Input,  Output, EventEmitter  } from '@angular/core';
import { Product } from 'src/app/models/product'
import { MessengerService } from 'src/app/services/messenger.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalService } from 'src/app/services/modal.service'

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  _http:HttpClient;
  _errorMessage:String = "";
  orders=[]
  message:string;
  // photo:string;

  // img = new Image();
   
  //  source:string

   
   
 
  @Input() productItem: Product
  // @Output() messageEvent = new EventEmitter<string>();

  constructor(private msg: MessengerService, private http: HttpClient, private name: ModalService) { 
// this.photo = "<img src = 'https://images-na.ssl-images-amazon.com/images/I/51gwvAAo78L._UY395_.jpg'>"
// div = document.getElementById('x');
  // this.source = "https://images-na.ssl-images-amazon.com/images/I/51gwvAAo78L._UY395_.jpg"
}

  ngOnInit() {
    // this.photo()
  }

 
// photo() {
//   var myloc = new Image();  
//   myloc.useMap = this.source;  
//   var img = document.createElement('img')  
//   img.setAttribute('src', myloc.useMap);  
//   img.setAttribute('style', "height:149px;width:280px;");  
//   var place = document.getElementById("photo")
//   place.appendChild(img);  
// }



  handleAddToCart() {
    this.msg.sendMsg(this.productItem)
    this.submitOrder(this.productItem)
  }

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

  review(){
    this.name.sendProduct(this.productItem)
    console.log(this.productItem)
    window.location.href = "http://localhost:4200/review";
    // console.log(name)
    // this.name.sendName(name)
  }
  
}
