import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { ProductItemComponent } from './components/shopping-cart/product-list/product-item/product-item.component';
import { routing }        from './app.routing';
import { EventEmitterService } from './services/event-emitter.service';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateComponent } from './components/admin/create/create.component';
import { ReviewComponent } from './components/review/review.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalService } from './services/modal.service';
import { ViewComponent } from './components/review/view/view.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    ShoppingCartComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    PaymentComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    CreateComponent,
    ReviewComponent,
    FileSelectDirective,
    ViewComponent
  ],
  exports:[AppComponent,
    HeaderComponent,
    NavComponent,
    ShoppingCartComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    PaymentComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    CreateComponent, 
    FormsModule],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, routing, FontAwesomeModule
  ],
  providers: [EventEmitterService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
