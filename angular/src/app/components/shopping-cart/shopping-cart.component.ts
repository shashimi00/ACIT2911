import { Component, OnInit } from '@angular/core';
import { CartComponent} from './cart/cart.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  _http:HttpClient;

  constructor(private http: HttpClient, private eventEmitterService: EventEmitterService  ) {
    this._http = http;
   }

  ngOnInit() {
  }

  firstComponentFunction(){    
    this.eventEmitterService.onFirstComponentButtonClick();    
  } 

  click(){
    window.location.href = 'http://localhost:4200/payment';
  } 
}
