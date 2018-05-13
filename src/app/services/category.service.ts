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

  getAll() {
    return this.http.get(`${this.baseUrl}Categories`)
      .toPromise()
      .then(res => res.json())
      // .subscribe(data => {
      //   this.dataStore.categoryList = data;
      //   this._categoryList.next(Object.assign({}, this.dataStore).categoryList);
      // }, error => console.log('Could not load category.'));
  }

  addcategory(newcategory: Category) {
    console.log('add category');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add category : ' + JSON.stringify(newcategory));


    this.http.post(`${this.baseUrl}Categorys/`, JSON.stringify(newcategory), { headers: headers })
      .map(response => response.json()).subscribe(data => {
        this.dataStore.categoryList.push(data);
        this._categoryList.next(Object.assign({}, this.dataStore).categoryList);
      }, error => console.log('Could not add category.'));
  }

  public updatecategory(newcategory: Category) {
    console.log('updatecategory');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add category : ' + JSON.stringify(newcategory));


    this.http.put(`${this.baseUrl}Categorys/`, JSON.stringify(newcategory), { headers: headers })
      .map(response => response.json()).subscribe(data => {
        this.dataStore.categoryList.forEach((t, i) => {
          if (t.cateId === data.id) { this.dataStore.categoryList[i] = data; }
        });
      }, error => console.log('Could not update category.'));
  };

  removeItem(categoryId: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('removeItem:' + categoryId);
    this.http.delete(`${this.baseUrl}Category/${categoryId}`, { headers: headers }).subscribe(response => {
      this.dataStore.categoryList.forEach((t, i) => {
        if (t.cateId === categoryId) { this.dataStore.categoryList.splice(i, 1); }
      });

      this._categoryList.next(Object.assign({}, this.dataStore).categoryList);
    }, error => console.log('Could not delete category.'));
  }

}
