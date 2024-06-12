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
    return this.http.post<any>(`${ApiEndPont.BOLG_API}create`, body);
  }
  getBlogApi() {
    return this.http.get<any>(`${ApiEndPont.BOLG_API}blogs`);
  }
  deleteBlogApi(filter: any) {
    return this.http.delete<any>(`${ApiEndPont.BOLG_API}${filter}`);
  }
  editBlogApi(filter: any) {
    return this.http.put<any>(`${ApiEndPont.BOLG_API}edit`, filter);
  }
  detailBlogApi(id: any) {
    return this.http.post<any>(`${ApiEndPont.BOLG_API}details`, id);
  }
  getProfileApi(id:any) {
    return this.http.get<any>(`${ApiEndPont.REGISTER_POST_API}profile/${id}`);
  }
}


  

