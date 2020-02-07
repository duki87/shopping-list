import { Component, OnInit } from '@angular/core';
import { ShoppingItemsServiceService } from 'src/app/_services/shopping-items-service.service';
import { List } from 'src/app/_models/List';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from 'src/app/_models/Item';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  lists: List[];
  items: Item[];
  listId: string;

  constructor(private _shoppingItemsService: ShoppingItemsServiceService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        if(params.listId) {
          this.listId = params.listId;
          this._shoppingItemsService.getShoppingItems(params.listId)
          .subscribe(
            (items: Item[]) => {
              if(items.length < 1) {
                this.items = undefined;
              } else {
                this.items = items;
              }          
            }
          )
        } else {
          this.items = undefined;
        }
      }
    )

    this._shoppingItemsService.getLists()
      .subscribe(
        lists => {
          this.lists = lists.data;
        }
      )
  }

  completeItem(item: Item) {
    item.completed == true ? item.completed = false : item.completed = true;
    this._shoppingItemsService.updateShoppingItem(item, this.listId)
      .subscribe(
        item => {
          console.log(item)
        }
      )
  }

  deleteList() {
    return this._shoppingItemsService.deleteList(this.listId)
      .subscribe(
        res => {
          this.listId = undefined;
          this._router.navigate(['/shopping-lists']);
        },
        err => {
          console.log(err);
        }
      );
  }

  

}
