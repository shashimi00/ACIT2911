import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { CartComponent}          from './components/shopping-cart/cart/cart.component'
import { ShoppingCartComponent}  from './components/shopping-cart/shopping-cart.component'
import { EventEmitterService}    from './services/event-emitter.service'
import { PaymentComponent}       from './components/payment/payment.component'



const appRoutes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'payment', component: PaymentComponent },
  // { path: 'orderSummary', component: OrderSummaryComponent },
  { path: '', component: ShoppingCartComponent  },
  // { path: '**', component: AppComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
