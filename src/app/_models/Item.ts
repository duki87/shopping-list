export class Item {
    _id: String;
    title: String;
    price: Number;
    _listId: String;
    completed: Boolean;

    constructor(data) {
        this._id = data._id;
        this.title = data.title;
        this.price = data.price;
        this._listId = data._listId;
        this.completed = data.completed;
    }
}