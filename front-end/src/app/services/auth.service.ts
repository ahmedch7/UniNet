import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/api/auth';
  private roles: string[] = [];
  private currentUser: User | null = null;
  private tokenSubject: BehaviorSubject<string | null>;
  public authToken: Observable<string | null>;
  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('authToken')
    );
    this.authToken = this.tokenSubject.asObservable();
  }
  public get tokenValue(): string | null {
    return this.tokenSubject.value;
  }

  signup(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, formData).pipe(
      catchError((error) => {
        console.error('Signup error', error);
        return throwError(() => new Error('Signup failed'));
      })
    );
  }

  sendValidationEmail(email: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/send-validation-email`, { email })
      .pipe(
        catchError((error) => {
          console.error('Send validation email error', error);
          return throwError(() => new Error('Send validation email failed'));
        })
      );
  }

  validateAccount(email: string, validationCode: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/validate-account`, { email, validationCode })
      .pipe(
        catchError((error) => {
          console.error('Validate account error', error);
          return throwError(() => new Error('Validate account failed'));
        })
      );
  }

  loadUserFromLocalStorage(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user);
        this.roles = [this.currentUser!.role];
        console.log('loaded roles: ', this.roles);
      }
    }
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  signin(
    email: string,
    motDePasse: string,
    token?: string,
    rememberMe: boolean = false
  ): Observable<{ user: User; token: string }> {
    const body = { email, motDePasse, token, rememberMe };
    return this.http
      .post<{ user: User; token: string }>(`${this.apiUrl}/signin`, body)
      .pipe(
        tap((response) => {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUser = response.user;
          console.log('user coonecté', this.currentUser);
          this.roles = [response.user.role];
          console.log('roles', this.roles);
        }),
        catchError((error) => {
          console.error('Signin error', error);
          let errorMessage = 'Signin failed';
          if (error.status === 400) {
            errorMessage = 'Login failed! Check authentication credentials';
          } else if (error.status === 403) {
            errorMessage =
              'Your account is not active. Please contact support.';
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.currentUser = null;
    this.roles = [];
    this.router.navigate(['/login']);
  }

  setUser(user: User): void {
    this.currentUser = user;
  }

  getUser(): User | null {
    return this.currentUser;
  }

  clearUser(): void {
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUserRoles(): string[] {
    return this.roles;
  }
  hasAnyRole(roles: string[]): boolean {
    if (!roles || !Array.isArray(roles)) {
      return false;
    }
    return roles.includes(this.currentUser?.role ?? '');
  }
  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email }).pipe(
      catchError((error) => {
        console.error('Forgot Password error', error);
        return throwError(() => new Error('Forgot Password failed'));
      })
    );
  }

  verifyToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reset-password/${token}`).pipe(
      catchError((error) => {
        console.error('Verify Token error', error);
        return throwError(() => new Error('Verify Token failed'));
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/reset-password/${token}`, { newPassword })
      .pipe(
        catchError((error) => {
          console.error('Reset Password error', error);
          return throwError(() => new Error('Reset Password failed'));
        })
      );
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`).pipe(
      catchError((error) => {
        console.error('Get Profile error', error);
        return throwError(() => new Error('Failed to load profile'));
      })
    );
  }

  updateUserProfile(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile`, user).pipe(
      catchError((error) => {
        console.error('Update Profile error', error);
        return throwError(() => new Error('Failed to update profile'));
      })
    );
  }

  setupTwoFactorAuth(email: string): Observable<{ qrCodeUrl: string }> {
    return this.http
      .post<{ qrCodeUrl: string }>(`${this.apiUrl}/2fa/setup`, { email })
      .pipe(
        catchError((error) => {
          console.error('Setup 2FA error', error);
          return throwError(() => new Error('Failed to setup 2FA'));
        })
      );
  }

  verifyTwoFactorAuth(
    email: string,
    token: string
  ): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/2fa/verify`, { email, token })
      .pipe(
        catchError((error) => {
          console.error('Verify 2FA error', error);
          return throwError(() => new Error('Failed to verify 2FA'));
        })
      );
  }

  disableTwoFactor(userId: string): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/disable-2fa`, { userId })
      .pipe(
        catchError((error) => {
          console.error('Disable 2FA error', error);
          return throwError(() => new Error('Failed to disable 2FA'));
        })
      );
  }
}
