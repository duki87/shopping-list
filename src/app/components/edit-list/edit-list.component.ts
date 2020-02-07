import { Component, OnInit } from '@angular/core';
import { ShoppingItemsServiceService } from 'src/app/_services/shopping-items-service.service';
import { List } from 'src/app/_models/List';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  constructor(private _shoppingItemsService: ShoppingItemsServiceService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  listId: string;
  list: List = new List('');

  ngOnInit() {
      this._activatedRoute.params.subscribe(
        (params: Params) => {
          if(params.listId) {
            this.listId = params.listId;
            this._shoppingItemsService.getList(this.listId)
              .subscribe(list => {
                this.list = list.data;
              })
        }
      } 
    )
  }

  updateList() {
    this._shoppingItemsService.updateShoppingList(this.list, this.listId)
      .subscribe(list => {
        this._router.navigate(['/shopping-lists'])
      })
  }

}
