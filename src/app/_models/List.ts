import { Identifiers } from '@angular/compiler';

export class List {
    _id: String;
    title: String;

    constructor(data) {
        this._id = data._id;
        this.title = data.title;
    }
}