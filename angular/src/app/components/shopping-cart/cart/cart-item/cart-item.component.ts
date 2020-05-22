import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: any

  constructor() { }

  ngOnInit() {
  }

  remove() {
    if (this.cartItem.qty > 0){
      this.cartItem.qty--
    }
  }

}
