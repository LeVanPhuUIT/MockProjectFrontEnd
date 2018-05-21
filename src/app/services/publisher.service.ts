import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Publisher } from '../model/publisher';

@Injectable()
export class PublisherService {

  public publisherList: Observable<Publisher[]>;
  private _publisherList: BehaviorSubject<Publisher[]>;
  private baseUrl: string;
  private dataStore: {
    publisherList: Publisher[];
  };

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:18595/api/';
    this.dataStore = { publisherList: [] };
    this._publisherList = <BehaviorSubject<Publisher[]>>new BehaviorSubject([]);
    this.publisherList = this._publisherList.asObservable();
  }

  public getPagingPublisher(currentPage: number, pageSize: number, searchString: string) {
    return this.http.get(`${this.baseUrl}Publishers?currentPage=${currentPage}&pageSize=${pageSize}&searchString=${searchString}`)
      .toPromise()
      .then(res => res.json())
  }

  public getAll() {
    return this.http.get(`${this.baseUrl}Publishers`)
      .toPromise()
      .then(res => res.json())
    // .subscribe(data => {
    //   this.dataStore.publisherList = data;
    //   this._publisherList.next(Object.assign({}, this.dataStore).publisherList);
    // }, error => console.log('Could not load publisher.'));
  }

  public addpublisher(newPublisher: Publisher) {
    console.log('add publisher');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add publisher : ' + JSON.stringify(newPublisher));


    return this.http.post(`${this.baseUrl}Publishers/`, JSON.stringify(newPublisher), { headers: headers })
      .toPromise().
      then(res => res.json());
    // .map(response => response.json()).subscribe(data => {
    //   this.dataStore.publisherList.push(data);
    //   this._publisherList.next(Object.assign({}, this.dataStore).publisherList);
    // }, error => console.log('Could not add publisher.'));
  }

  public updatePublisher(oldPublisher: Publisher) {
    console.log('updatepublisher');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('Update publisher : ' + JSON.stringify(oldPublisher));

    console.log(oldPublisher.PubID);
    return this.http.put(`${this.baseUrl}Publishers/${oldPublisher.PubID}`, JSON.stringify(oldPublisher), { headers: headers })
      .map(response => response.json());
  };

  public removeItem(PubID: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('removeItem:' + PubID);
    return this.http.delete(`${this.baseUrl}Publishers/${PubID}`, { headers: headers });
  }
}
