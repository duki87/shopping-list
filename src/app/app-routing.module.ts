import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { NewShoppingItemComponent } from './components/new-shopping-item/new-shopping-item.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'shopping-lists', pathMatch: 'full' },
  { path: 'new-list', component: NewListComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'shopping-lists', component: ShopComponent },
  { path: 'shopping-lists/:listId', component: ShopComponent },
  { path: 'shopping-lists/:listId/new-shopping-item', component: NewShoppingItemComponent },
  { path: '404', component: NotFoundComponent },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
