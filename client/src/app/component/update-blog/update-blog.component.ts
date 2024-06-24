import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { SharedService } from '../../service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderBlogComponent } from '../header-blog/header-blog.component';
import Quill from 'quill';
import { ImageHandler, Options } from 'ngx-quill-upload';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { AutoResizeDirective } from '../../directives/auto-resize.directive';
Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'app-update-blog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    HeaderBlogComponent,
    AutoResizeDirective,
  ],
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.css',
})
export class UpdateBlogComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  http = inject(HttpClient);
  uploadedImageURLs: string[] = [];
  quillConfiguration: any;
  ngOnInit(): void {
    this.onDetailDisplay();
    this.quillConfiguration = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image'],
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
              console.log('<<<<<', res.url);
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
  onSelectionChanged = (event: any) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  };
  detailBlog: any;
  idDelete: any;
  tilteData: any;
  // ngOnInit(): void {
  //   this.onDetailDisplay();
  // }
  creator: any;
  onDetailDisplay() {
    const id = this.route.snapshot.paramMap.get('id');
    const body = {
      _id: id,
    };
    this.sharedService.detailBlogApi(body).subscribe((res: Response) => {
      this.detailBlog = res;
      const blogDetail = this.detailBlog.find((item: any) => item._id === id);
      if (blogDetail) {
        this.idDelete = blogDetail._id;
        this.tilteData = blogDetail.title;
        this.htmlText = blogDetail.description;
        this.uploadedImageURLs = blogDetail.images;
        this.creator = blogDetail.creator;
      }
    });
  }
  editorText: any;
  onContentChanged = (event: any) => {
    this.editorText = event.html;
  };

  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };
  isupdate = false;
  onEdit() {
    this.isupdate = true;
  }
  onUpdate() {
    const body = {
      id: this.idDelete,
      title: this.tilteData,
      description: this.htmlText,
      images: this.uploadedImageURLs,
    };
    this.sharedService.editBlogApi(body).subscribe((res: Response) => {
      this.onDetailDisplay();
      this.isupdate = false;
    });
  }
  onDelete() {
    this.sharedService.deleteBlogApi(this.idDelete).subscribe((res: any) => {
      this.router.navigate(['/blog']);
    });
  }
  onGoBack() {
    this.router.navigate(['/blog']);
  }
  cancelEdit() {
    this.isupdate = false;
  }
}
