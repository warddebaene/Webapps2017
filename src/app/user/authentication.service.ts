import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { User } from './user.model';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
  private _url = 'http://localhost:4200/API/users';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<string>(currentUser && currentUser.username);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }   

  get token(): string {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  login(username: string, password: string): Observable<boolean> {
  return this.http.post(`${this._url}/login`, 
    { username: username, password: password })
    .map(res => res.json()).map(res => {
      const token = res.token;
      const id = res.id;
      if (token) {
        localStorage.setItem('currentUser', 
          JSON.stringify({ username: username, token: token, id: id}));
        this._user$.next(username);
        return true;
      } else {
        return false;
      }
    });
} 

register(username: string,firstname: string,lastname: string,birthdate: Date, password: string): Observable<boolean> {
    let user = new User(username,firstname,lastname,birthdate);
    return this.http.post(`${this._url}/register`, 
      { user: user, password: password })
      .map(res => res.json()).map(res => {
        const token = res.token;
        const id = res.id;
        if (token) {
          localStorage.setItem('currentUser', 
            JSON.stringify({ username: username, token: token, id: id}));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkusername`, { username: username }).map(res => res.json())
    .map(item => {
      if (item.username === 'alreadyexists') {
        return false;
      } else {
        return true;
      }
    });
  }

  addRecipeToUser(recipeid: string, user: User) :  Observable<User>{
    return this.http.post(`${this._url}/addrecipe/${user.id}`, { recipeid: recipeid },{ headers: new Headers({Authorization: `Bearer ${this.token}`}) }).map(res => res.json());
  }
  addFriendToUser(friendid: string, userid: string) :  Observable<User>{
    return this.http.post(`${this._url}/addfriend/${userid}`, { userid: friendid },{ headers: new Headers({Authorization: `Bearer ${this.token}`}) }).map(res => res.json());
  }


  getUser(id) :  Observable<User> {
    return this.http.get(`${this._url}/user/${id}/`,{ headers: new Headers({Authorization: `Bearer ${this.token}`}) }).map(response =>
      response.json()).map(item =>
        User.fromJSON(item)
      );
  }

  get allusers(): Observable<User[]> {
    return this.http.get(`${this._url}/all`,{ headers: new Headers({Authorization: `Bearer ${this.token}`}) })
      .map(response => response.json().map(item => new User(  item.username,item.firstname,item.lastname,item.birthdate,item._id,item.recipes,  item.friends)));

  }
  logout() {
  if (this.user$.getValue()) {
    localStorage.removeItem('currentUser');
    setTimeout(() => this._user$.next(null));
  }      
}
}
