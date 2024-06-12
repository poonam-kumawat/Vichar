import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}

  saveUserId(userId: string) {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  clearUserId() {
    localStorage.removeItem('userId');
  }
  isLoggedIn(): boolean {   
    return !!this.getUserId();
  }

  logout(): void {    
    localStorage.removeItem('userId');
  }
}
