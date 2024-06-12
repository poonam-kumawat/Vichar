import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['blog']);
        return false;
      } else {
        return true;
      }
    }
//   canActivate(): boolean {
//     if (this.authService.isLoggedIn()) {
//       // If logged in, allow access
//       return true;
//     } else {
//       // If not logged in, redirect to login page
//     //   this.router.navigate(['/login']);4
//     this.router.navigateByUrl('/login');
//       return false;
//     }
//   }
}
