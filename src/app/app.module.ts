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
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthService } from './_services/auth.service';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EditShoppingItemComponent } from './components/edit-shopping-item/edit-shopping-item.component';
import { CanAccessGuard } from './_guards/can-access.guard';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    NewListComponent,
    NewShoppingItemComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    EditListComponent,
    EditShoppingItemComponent
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
    AuthService,
    CanAccessGuard,
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
