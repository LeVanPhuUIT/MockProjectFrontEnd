import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Books } from '../model/books';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BookService {

    public bookList: Observable<Books[]>;
    private _bookList: BehaviorSubject<Books[]>;
    private baseUrl: string;
    private dataStore: {
        bookList: Books[];
    };

    constructor(private http: Http) {
        this.baseUrl = 'http://localhost:18595/api';
        this.dataStore = { bookList: [] };
        this._bookList = <BehaviorSubject<Books[]>>new BehaviorSubject([]);
        this.bookList = this._bookList.asObservable();
    }

    getAllBook() {
        return this.http.get('http://localhost:18595/api/books')
            .toPromise()
            .then(res => res.json())
    }
    addBook(newBook: Books) {
        console.log('add book');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add Book : ' + JSON.stringify(newBook));


        this.http.post(`${this.baseUrl}books/`, JSON.stringify(newBook), { headers: headers })
            .map(response => response.json()).subscribe(data => {
                this.dataStore.bookList.push(data);
                this._bookList.next(Object.assign({}, this.dataStore).bookList);
            }, error => console.log('Could not add book.'));
    }

    public updateBook(newBook: Books) {
        console.log('updateBook');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add Book : ' + JSON.stringify(newBook));


        this.http.put(`${this.baseUrl}UpdateBook/`, JSON.stringify(newBook), { headers: headers })
            .map(response => response.json()).subscribe(data => {
                this.dataStore.bookList.forEach((t, i) => {
                    if (t.bookId === data.id) { this.dataStore.bookList[i] = data; }
                });
            }, error => console.log('Could not update Book.'));
    };

    removeItem(BookId: number) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('removeItem:' + BookId);
        this.http.delete(`${this.baseUrl}DeleteBook/${BookId}`, { headers: headers }).subscribe(response => {
            this.dataStore.bookList.forEach((t, i) => {
                if (t.bookId === BookId) { this.dataStore.bookList.splice(i, 1); }
            });

            this._bookList.next(Object.assign({}, this.dataStore).bookList);
        }, error => console.log('Could not delete Book.'));
    }

}
