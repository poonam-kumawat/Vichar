import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

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
  isBlogCreation:boolean=false;
  setBlogCreation(isCreation:boolean){
    return this.isBlogCreation=isCreation;
  }
  getBlogCreation(){
    return this.isBlogCreation;
  }
}
