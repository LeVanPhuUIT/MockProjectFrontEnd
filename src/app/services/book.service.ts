import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Books } from '../model/books';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable()
export class BookService {

    public bookList: Observable<Books[]>;
    private _bookList: BehaviorSubject<Books[]>;
    private baseUrl: string;
    public bookEdit: Books;
    private dataStore: {
        bookList: Books[];
    };

    constructor(private http: Http) {
        this.baseUrl = 'http://localhost:18595/api/books';
        this.dataStore = { bookList: [] };
        this._bookList = <BehaviorSubject<Books[]>>new BehaviorSubject([]);
        this.bookList = this._bookList.asObservable();
    }

    public getAllBook() {
        return this.http.get('http://localhost:18595/api/books/')
            .toPromise()
            .then(res => res.json())
    }

    public getPagingBook(currentPage: number, pageSize: number, searchString: string) {
        return this.http.get(`${this.baseUrl}?currentPage=${currentPage}&pageSize=${pageSize}&searchString=${searchString}`)
            .toPromise()
            .then(res => res.json())
    }

    public addBook(newBook: Books) {
        console.log('add book');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add Book : ' + JSON.stringify(newBook));

        return this.http.post(`${this.baseUrl}`, JSON.stringify(newBook), { headers: headers })
            .map(response => response.json());
    }

    public updateBook(newBook: Books) {
        console.log('updateBook');
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('add Book : ' + JSON.stringify(newBook));


        return this.http.put(`${this.baseUrl}/${newBook.BookID}`, JSON.stringify(newBook), { headers: headers });
    };

    public removeItem(BookId: number) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json; charset=utf-8');
        console.log('removeItem:' + BookId);
        return this.http.delete(`${this.baseUrl}/${BookId}`, { headers: headers });
    }

    // public postFile(fileToUpload: File): Observable<boolean> {
    //     const headersConfig = new Headers();
    //     const endpoint = 'your-destination-url';
    //     const formData: FormData = new FormData();
    //     formData.append('fileKey', fileToUpload, fileToUpload.name);
    //     return this.http.post(endpoint, formData, { headers: headersConfig })
    //     .map(() => { return true; });
    // }

    public postFile1(fileToUpload: File) {
        const endpoint = 'http://localhost:18595/api/Books/UploadImage';
        const formData: FormData = new FormData();
        formData.append('Image', fileToUpload, fileToUpload.name);
        return this.http
          .post(endpoint, formData);
    }

    public showBookEdit() {
        console.log(this.bookEdit);
    }

}
