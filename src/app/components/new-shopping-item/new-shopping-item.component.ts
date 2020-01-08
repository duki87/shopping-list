import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/_models/Item';
import { ShoppingItemsServiceService } from 'src/app/_services/shopping-items-service.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-shopping-item',
  templateUrl: './new-shopping-item.component.html',
  styleUrls: ['./new-shopping-item.component.scss']
})
export class NewShoppingItemComponent implements OnInit {

  constructor(private _shoppingItemsService: ShoppingItemsServiceService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  title: string;
  price: string;
  listId: string;

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.listId = params.listId;
      }
    )
  }

  createShoppingItem() {
    const item = new Item({title: this.title, price: this.price});
    this._shoppingItemsService.createShoppingItem(item, this.listId)
      .subscribe((res: any) => {
        console.log(res)
        this._router.navigate(['/shopping-lists/'+this.listId]);
    })
  }
}
