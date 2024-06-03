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

  googleLoginApi(token: any) {
    return this.http.post<any>(`${ApiEndPont.REGISTER_POST_API}login/google`, {
      token,
    });
  }

  blogCreateApi(body: any) {
    return this.http.post<any>(`${ApiEndPont.BOLG_API}create`, 
      body,
    );
  }
}


  

