import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { CartComponent}          from './components/shopping-cart/cart/cart.component'
import { ShoppingCartComponent}  from './components/shopping-cart/shopping-cart.component'
import { EventEmitterService}    from './services/event-emitter.service'
import { PaymentComponent}       from './components/payment/payment.component'
import { RegisterComponent }     from './components/register/register.component';
import { LoginComponent }        from './components/login/login.component';
import { AdminComponent }        from './components/admin/admin.component'   
import { CreateComponent }       from './components/admin/create/create.component'

const appRoutes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: ShoppingCartComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'create', component: CreateComponent},
  // { path: 'orderSummary', component: OrderSummaryComponent },
  { path: '', component: LoginComponent  },
  // { path: '**', component: AppComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
