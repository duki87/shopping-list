import { Component, OnInit } from '@angular/core';
import { ShoppingItemsServiceService } from 'src/app/_services/shopping-items-service.service';
import { List } from 'src/app/_models/List';
import { Item } from 'src/app/_models/Item';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-shopping-item',
  templateUrl: './edit-shopping-item.component.html',
  styleUrls: ['./edit-shopping-item.component.scss']
})
export class EditShoppingItemComponent implements OnInit {

  constructor(private _shoppingItemsService: ShoppingItemsServiceService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  listId: string;
  itemId: string;
  item: Item = new Item('');

  ngOnInit() {
      this._activatedRoute.params.subscribe(
        (params: Params) => {
          if(params.listId && params.itemId) {
            this.listId = params.listId;
            this.itemId = params.itemId;
            this._shoppingItemsService.getItem(this.listId, this.itemId)
              .subscribe(res => {
                this.item = res.data[0];
                console.log(res.data[0])
              })
        }
      } 
    )
  }

  updateShoppingItem() {
    this._shoppingItemsService.updateShoppingItem(this.item)
      .subscribe(item => {
        this._router.navigate([`/shopping-lists/${this.item._listId}`])
      })
  } 

}
