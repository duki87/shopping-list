import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './components/shop/shop.component';
import { ShoppingItemsServiceService } from './_services/shopping-items-service.service';
import { WebRequestService } from './_services/web-request-service.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NewListComponent } from './components/new-list/new-list.component';
import { NewShoppingItemComponent } from './components/new-shopping-item/new-shopping-item.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { WebReqInterceptor } from './_services/web-req.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    NewListComponent,
    NewShoppingItemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ShoppingItemsServiceService,
    WebRequestService,
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
