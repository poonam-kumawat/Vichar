import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';
import { HeaderBlogComponent } from '../header-blog/header-blog.component';
import { AuthService } from '../../service/auth.service';
import Quill from 'quill';
import { ImageHandler, Options } from 'ngx-quill-upload';
import { HttpClient } from '@angular/common/http';
import { resourceLimits } from 'worker_threads';
Quill.register('modules/imageHandler', ImageHandler);

// export const QuillConfiguration = {
//   toolbar: [
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],
//     ['bold', 'italic', 'underline', 'strike'],
//     ['blockquote', 'code-block'],
//     // [{ header: 1 }, { header: 2 }],
//     // [{ color: [] }, { background: [] }],
//     // ['image'],
//     // ['link'],
//     ['link', 'image', 'video'],

//     ['clean'],
//   ],
// };
@Component({
  selector: 'app-blog-createion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    HeaderBlogComponent,
  ],
  templateUrl: './blog-createion.component.html',
  styleUrl: './blog-createion.component.css',
})
export class BlogCreateionComponent implements OnInit {
  http = inject(HttpClient);
  uploadedImageURLs: string[] = [];
  quillConfiguration: any;
  ngOnInit(): void {
    this.quillConfiguration = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      imageHandler: {
        upload: (file: any): Promise<any> => {
          return new Promise((resolve, reject) => {
            if (
              file.type === 'image/jpeg' ||
              file.type === 'image/png' ||
              file.type === 'image/jpg'
            ) {
              // File types supported for image
              if (file.size < 100000000) {
                const uploadData = new FormData();
                console.log('>>>', uploadData);
                uploadData.append('file', file, file.name);
                // uploadData.append('file', file.name);
                console.log('>>>', uploadData);

                return this.http
                  .post('http://localhost:5000/api/blog/upload', uploadData)
                  .toPromise()
                  .then((result: any) => {
                    console.log(result);
                    this.uploadedImageURLs.push(result.url);
                    resolve(result.url);
                  })
                  .catch((error: any) => {
                    reject('Upload failed');
                    // Handle error control
                    console.error('Error:', error);
                  });
              } else {
                reject('Size too large');
                return;
              }
            } else {
              reject('Unsupported type');
              return;
            }
          });
        },
        fetch: (url: string, callback: Function) => {
          this.http.get(url).subscribe(
            (res: any) => {
              console.log("<<<<<",res.url)
              callback(res.url);
            },
            (error: any) => {
              console.error('Error fetching image:', error);
              callback('');
            }
          );
        },
        accepts: ['png', 'jpg', 'jpeg', 'jfif'],
      } as Options,
    };
    
  }
  htmlText: any;
  titleText: any;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private authService: AuthService
  ) {}
  onSelectionChanged = (event: any) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  };

  editorText: any;
  onContentChanged = (event: any) => {
    this.editorText = event.html;
    this.editorText = this.editorText.replace(/src="blob:/g, 'src="');
    console.log(this.editorText)
  };
  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };
  onBlogSubmit() {
    const object = {
      title: this.titleText,
      type: this.SelectedValue,
      description: this.editorText,
      creator: this.authService.getUserId(),
      images:this.uploadedImageURLs
    };
    this.sharedService.blogCreateApi(object).subscribe((res: any) => {
      this.router.navigate(['/blog']);
    });
  }
  SelectedValue: any;
  fileImage: any;
  onSelectValue(e: any) {}

  
}
