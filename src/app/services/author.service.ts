import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Author } from '../model/author';

@Injectable()
export class AuthorService {

  public authorList: Observable<Author[]>;
  private _authorList: BehaviorSubject<Author[]>;
  private baseUrl: string;
  private dataStore: {
    authorList: Author[];
  };

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:18595/api/';
    this.dataStore = { authorList: [] };
    this._authorList = <BehaviorSubject<Author[]>>new BehaviorSubject([]);
    this.authorList = this._authorList.asObservable();
  }

  public getPagingAuthor(currentPage: number, pageSize: number, searchString: string){
    return this.http.get(`${this.baseUrl}Authors?currentPage=${currentPage}&pageSize=${pageSize}&searchString=${searchString}`)
      .toPromise()
      .then(res => res.json())
  }
  
  public getAll() {
    return this.http.get(`${this.baseUrl}Authors`)
      .toPromise()
      .then(res => res.json())
      // .subscribe(data => {
      //   this.dataStore.authorList = data;
      //   this._authorList.next(Object.assign({}, this.dataStore).authorList);
      // }, error => console.log('Could not load author.'));
  }

  public addauthor(newAuthor: Author) {
    console.log('add author');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add author : ' + JSON.stringify(newAuthor));


    return this.http.post(`${this.baseUrl}Authors/`, JSON.stringify(newAuthor), { headers: headers })
    .toPromise().
    then(res => res.json());
      // .map(response => response.json()).subscribe(data => {
      //   this.dataStore.authorList.push(data);
      //   this._authorList.next(Object.assign({}, this.dataStore).authorList);
      // }, error => console.log('Could not add author.'));
  }


  public updateAuthor(oldAuthor: Author) {
    console.log('updateauthor');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('Update author : ' + JSON.stringify(oldAuthor));

    console.log(oldAuthor.AuthorID);
    return this.http.put(`${this.baseUrl}Authors/${oldAuthor.AuthorID}`, JSON.stringify(oldAuthor), { headers: headers })
      .map(response => response.json());
  };

  public removeItem(AuthorID: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('removeItem:' + AuthorID);
    return this.http.delete(`${this.baseUrl}Authors/${AuthorID}`, { headers: headers });
  }


}
