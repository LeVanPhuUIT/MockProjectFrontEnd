import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Books } from '../model/books';

@Injectable()
export class BookService {

  constructor(private http: Http){}

    getAddBook() {
        return this.http.get('http://localhost:18595/api/Books')
        .toPromise()
        .then(res => res.json())
    }

}
