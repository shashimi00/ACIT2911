import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private subject = new Subject();


  constructor() { }

    sendProduct(product) {
    this.subject.next(product) //Triggering an event
  }

  getProduct() {
    return this.subject.asObservable()
  }

}
