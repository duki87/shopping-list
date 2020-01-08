import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { WebRequestService } from './web-request-service.service';
import { List } from '../_models/list';
import { Item } from '../_models/Item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemsServiceService {

  constructor(private _webService: WebRequestService) { 

  }

  createList(list: List) {
    return this._webService.post('lists', list)
      .pipe(catchError(this.errorHandler));
  }

  getLists() {
    return this._webService.get('lists')
    .pipe(catchError(this.errorHandler));
  }

  getShoppingItems(listId) {
    return this._webService.get(`lists/${listId}/items`)
    .pipe(catchError(this.errorHandler));
  }

  createShoppingItem(item: Item, listId: string) {
    return this._webService.post(`lists/${listId}/items`, item)
      .pipe(catchError(this.errorHandler));
  }

  updateShoppingItem(item: Item, listId: string) {
    return this._webService.patch(`lists/${listId}/items/${item._id}`, item)
      .pipe(catchError(this.errorHandler));
  }
  
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
