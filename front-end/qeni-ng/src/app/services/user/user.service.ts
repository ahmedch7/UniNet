import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: ReplaySubject<any> = new ReplaySubject<any>(1)
  private isConnected: ReplaySubject<Boolean> = new ReplaySubject<Boolean>(1);
  private isAdmin: ReplaySubject<Boolean> = new ReplaySubject<Boolean>(1);
  isConnecteds: Boolean = false;
  isAdminn: Boolean = false;
  constructor(private _http: HttpClient,private _router:Router) {
    this.isConnected.next(false);
    this.isAdmin.next(false);
  }

  getIsConnected() {
    return this.isConnected.asObservable();
  }

  setIsConnected(isConnected: Boolean) {
    this.isConnected.next(isConnected);
  }

  getIsAdmin() {
    return this.isAdmin.asObservable();
  }

  setIsAdmin(isConnected: Boolean) {
    this.isAdmin.next(isConnected);
  }

  getUser() {
    return this.user.asObservable();
  }

  setUser(user) {
    this.user.next(user)
  }

  getUserById(id: number) {
    return this._http.get(`http://localhost:9000/AUTH/uaa/persons/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `bearer ${localStorage.getItem('accessToken')}`
      })
    });
  }

  signIn(credentials: { username: string, password: string }): Observable<any> {
    let body = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password)
      .set('grant_type', 'password')
    let authorization = btoa('browser:user');
    let customHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `basic ${authorization}`
    })
    return this._http.post('http://localhost:9000/AUTH/uaa/oauth/token', body, { headers: customHeader }).pipe(
      switchMap(
        (response: any) => {
          this.isConnecteds = true;
          localStorage.setItem('accessToken', response.access_token);
          this.getUserById(response.id).subscribe(
            (data: any) => {
              this.user.next(data);
              if (data.role[0].authority == 'ROLE_ADMIN') {
                this.isAdmin.next(true);
              }
            }
          )
          this.isConnected.next(true);
          return of(response);
        }
      )
    )
  }


  createAccount(user: { firstName: string, lastName: string, email: string, password: string }) {
    let body = new HttpParams()
      .set('username', "larafamouhamed5@gmail.com")
      .set('password', "user")
      .set('grant_type', 'password')
    let authorization = btoa('browser:user');
    let customHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `basic ${authorization}`
    })
    this._http.post('http://localhost:9000/AUTH/uaa/oauth/token', body, { headers: customHeader }).subscribe(
      (data: any) => {
        console.log("jeb l token")
        this._http.post('http://localhost:9000/AUTH/uaa/persons', user, {headers: new HttpHeaders({
          'Authorization': `bearer ${data.access_token}`
        })}).subscribe(
          (response: any) => {
            this.signIn({ username: response.email, password: response.password }).subscribe(
              ()=>{
                this._router.navigate(['/home'])
              }
            );
          }
        )
      })
    // return this._http.post('http://localhost:9000/AUTH/uaa/persons', user).pipe(
    //   switchMap(
    //     (response: any) => {
    //       this.signIn({ username: response.email, password: response.password }).subscribe();
    //       return of(response);
    //     }
    //   )
    // )
  }

  logout() {
    //na3mlou revoke lel access token
    this.isConnected.next(false);
    localStorage.removeItem("accessToken")
  }
  forgotPassword(email:any) {
    let accessToken;
    let body = new HttpParams()
      .set('username', "larafamouhamed5@gmail.com")
      .set('password', "user")
      .set('grant_type', 'password')
    let authorization = btoa('browser:user');
    let customHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `basic ${authorization}`
    })
    this._http.post('http://localhost:9000/AUTH/uaa/oauth/token', body, { headers: customHeader }).subscribe(
      (data: any) => {
        this._http.post(`http://localhost:9000/AUTH/uaa/forgotPassword/${email}`,null, {
          headers: new HttpHeaders({
            'Authorization': `bearer ${data.access_token}`
          })
        }).subscribe(
          ()=>this._router.navigate(['/'])
        );
      }
    )
  }

  resetPassword(password,id){
    console.log(password)
    let body = new HttpParams()
      .set('username', "larafamouhamed5@gmail.com")
      .set('password', "user")
      .set('grant_type', 'password')
    let authorization = btoa('browser:user');
    let customHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `basic ${authorization}`
    })
    this._http.post('http://localhost:9000/AUTH/uaa/oauth/token', body, { headers: customHeader }).subscribe(
      (data: any) => {  
        console.log(`http://localhost:9000/AUTH/persons/resetPassword/${id}`)      
        this._http.post(`http://localhost:9000/AUTH/uaa/persons/resetPassword/${id}`,password, {
          headers: new HttpHeaders({
            'Authorization': `bearer ${data.access_token}`
          })
        }).subscribe(
          ()=>{this._router.navigate(['/sign-in'])}
        );
      }
    )
  }
}
