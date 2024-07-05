import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = next.data['roles'] as string[];  // Use bracket notation and cast to string array
    console.log("expectedRoles", expectedRoles)
    if (this.authService.isAuthenticated() && this.authService.hasAnyRole(expectedRoles)) {
      console.log("User is authenticated and has required roles");
      return true;
    } else {
      console.log("User is  authenticated",this.authService.isAuthenticated());
      console.log("User has role",this.authService.hasAnyRole(expectedRoles))
    console.log("expectedRoles", expectedRoles)

      alert('Unauthorized access. You do not have permission to view this page.');
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
