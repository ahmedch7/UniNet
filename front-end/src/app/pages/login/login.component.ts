import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  email: string = '';
  motDePasse: string = '';
  rememberMe: boolean = false;
  token?: string;
  constructor(private authService: AuthService, private router: Router) {
    // Get token from local storage if exists
    
  }
  ngOnInit() {
    this.token = localStorage.getItem('authToken');
    console.log("this.token is set");
    if (this.token) {
      this.router.navigate(['/dashboard']);
    }
  }
  login() {
    this.authService
      .signin(this.email, this.motDePasse, this.token, this.rememberMe)
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          const role = response.user.role;
          if (role === 'etudiant') {
            this.router.navigate(['/tables']);
          } else if (role === 'admin') {
            this.router.navigate(['/tables']);
          } else if (role === 'responsable') {
            this.router.navigate(['/tables']);
          } else if (role === 'collaborateur') {
            this.router.navigate(['/tables']);
          } else {
            this.router.navigate(['/login']); 
          }
        },
        error: (err) => {
          console.error('Login error', err);
          alert('Login failed: ' + err.message);
        },
      });
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  navigateToSignUp() {
    this.router.navigate(['/register']);
  }

}
