import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Category } from '../model/category';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CategoryService {

  public categoryList: Observable<Category[]>;
  private _categoryList: BehaviorSubject<Category[]>;
  private baseUrl: string;
  private dataStore: {
    categoryList: Category[];
  };

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:18595/api/';
    this.dataStore = { categoryList: [] };
    this._categoryList = <BehaviorSubject<Category[]>>new BehaviorSubject([]);
    this.categoryList = this._categoryList.asObservable();
  }

  public getPagingCategory(currentPage: number, pageSize: number, searchString: string){
    return this.http.get(`${this.baseUrl}Categories?currentPage=${currentPage}&pageSize=${pageSize}&searchString=${searchString}`)
      .toPromise()
      .then(res => res.json())
  }

  public getAll() {
    return this.http.get(`${this.baseUrl}Categories`)
      .toPromise()
      .then(res => res.json())
      // .subscribe(data => {
      //   this.dataStore.categoryList = data;
      //   this._categoryList.next(Object.assign({}, this.dataStore).categoryList);
      // }, error => console.log('Could not load category.'));
  }

  public addcategory(newcategory: Category) {
    console.log('add category');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add category : ' + JSON.stringify(newcategory));


    return this.http.post(`${this.baseUrl}Categories/`, JSON.stringify(newcategory), { headers: headers })
    .toPromise().
    then(res => res.json());
      // .map(response => response.json()).subscribe(data => {
      //   this.dataStore.categoryList.push(data);
      //   this._categoryList.next(Object.assign({}, this.dataStore).categoryList);
      // }, error => console.log('Could not add category.'));
  }


  public addcategory1<T>(newcategory: T) {
    console.log('add category');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add category : ' + JSON.stringify(newcategory));


    return this.http.post(`${this.baseUrl}Categories/`, JSON.stringify(newcategory), { headers: headers })
    .toPromise().
    then(res => res.json());
      // .map(response => response.json()).subscribe(data => {
      //   this.dataStore.categoryList.push(data);
      //   this._categoryList.next(Object.assign({}, this.dataStore).categoryList);
      // }, error => console.log('Could not add category.'));
  }

  public updatecategory(oldcategory: Category) {
    console.log('updatecategory');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('Update category : ' + JSON.stringify(oldcategory));

    console.log(oldcategory.CateID);
    return this.http.put(`${this.baseUrl}Categories/${oldcategory.CateID}`, JSON.stringify(oldcategory), { headers: headers })
      .map(response => response.json());
  };

  public removeItem(categoryId: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('removeItem:' + categoryId);
    return this.http.delete(`${this.baseUrl}Categories/${categoryId}`, { headers: headers });
  }

}
