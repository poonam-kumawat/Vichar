import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiEndPont } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  http = inject(HttpClient);
  registerApi(registerObject: any) {
    return this.http.post<any>(
      `${ApiEndPont.REGISTER_POST_API}register`,
      registerObject
    );
  }

loginApi(loginObject: any) {
    return this.http.post<any>(
      `${ApiEndPont.REGISTER_POST_API}login`,
      loginObject
    );
  }
}
