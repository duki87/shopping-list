import { Component, OnInit } from '@angular/core';
import { ShoppingItemsServiceService } from 'src/app/_services/shopping-items-service.service';
import { List } from 'src/app/_models/List';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private _shoppingItemsService: ShoppingItemsServiceService, private _router: Router) { }

  ngOnInit() {
  }

  createShoppingList(title) {
    const list = new List({
       title: title 
      })
    this._shoppingItemsService.createList(list)
      .subscribe((res: any) => {
        console.log(res)
        this._router.navigate(['/shopping-lists/'+res._id]);
      })
  }

}
