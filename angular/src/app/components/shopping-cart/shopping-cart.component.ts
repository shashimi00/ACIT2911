import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/services/event-emitter.service'; 

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private eventEmitterService: EventEmitterService) { }

  ngOnInit() {
  }

  
}
