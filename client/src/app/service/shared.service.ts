import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  http = inject(HttpClient);
  registerApi(registerObject: any) {
    return this.http.post<any>(
      `${environment.REGISTER_POST_API}register`,
      registerObject
    );
  }

  loginApi(loginObject: any) {
    return this.http.post<any>(
      `${environment.REGISTER_POST_API}login`,
      loginObject
    );
  }

  googleLoginApi(token: any) {
    return this.http.post<any>(`${environment.REGISTER_POST_API}login/google`, {
      token,
    });
  }

  blogCreateApi(body: any) {
    return this.http.post<any>(`${environment.BOLG_API}create`, body);
  }
  getBlogApi(body: any) {
    return this.http.post<any>(`${environment.BOLG_API}blogs`, body);
  }
  deleteBlogApi(filter: any) {
    return this.http.delete<any>(`${environment.BOLG_API}${filter}`);
  }
  editBlogApi(filter: any) {
    return this.http.put<any>(`${environment.BOLG_API}edit`, filter);
  }
  detailBlogApi(id: any) {
    return this.http.post<any>(`${environment.BOLG_API}details`, id);
  }
  getProfileApi(id: any) {
    return this.http.get<any>(`${environment.REGISTER_POST_API}profile/${id}`);
  }
  editProfileApi(filter: any) {
    return this.http.put<any>(
      `${environment.REGISTER_POST_API}edit/profile`,
      filter
    );
  }
  profileUploadApi(uploadImage: any) {
    return this.http.post<any>(
      `${environment.REGISTER_POST_API}upload/profile`,
      uploadImage
    );
  }
  blogUploadApi(blogUpload: any) {
    return this.http.post<any>(`${environment.BOLG_API}upload`, blogUpload);
  }
  getCreatorsApi() {
    return this.http.get<any>(`${environment.REGISTER_POST_API}creators`);
  }
}


  

