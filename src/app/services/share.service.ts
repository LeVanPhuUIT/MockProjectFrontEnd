import { Injectable } from '@angular/core';
import { Books } from '../model/books';

@Injectable()
export class ShareService {

  public bookEdit: Books;
  constructor() {
    this.bookEdit = new Books();
  }

}
