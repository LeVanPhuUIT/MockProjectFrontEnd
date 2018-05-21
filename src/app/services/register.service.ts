import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod, Headers } from '@angular/http';
import { User } from '../model/user';

@Injectable()
export class RegisterService {
  private baseUrl: string;

  constructor(private http: Http) {
    this.baseUrl = 'http://localhost:18595/api/Account/Register';
  }

  public addUser(newUser: User) {
    console.log('add publisher');
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');
    console.log('add publisher : ' + JSON.stringify(newUser));


    return this.http.post(`${this.baseUrl}/`, JSON.stringify(newUser), { headers: headers });
  }
}
