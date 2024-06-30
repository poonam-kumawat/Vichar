import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';
import { HeaderBlogComponent } from '../header-blog/header-blog.component';
import { AuthService } from '../../service/auth.service';
import Quill from 'quill';
import { ImageHandler, Options } from 'ngx-quill-upload';
import { HttpClient } from '@angular/common/http';
import { resourceLimits } from 'worker_threads';
import { AutoResizeDirective } from '../../directives/auto-resize.directive';
Quill.register('modules/imageHandler', ImageHandler);

@Component({
  selector: 'app-blog-createion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    HeaderBlogComponent,
    AutoResizeDirective,
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
        ['bold'],
        ['italic'],
        ['underline', 'strike'],
        ['blockquote'],
        ['code-block'],
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
             if (file.size < 100000000) {
                const uploadData = new FormData();
                uploadData.append('file', file, file.name);
                return this.sharedService.blogUploadApi(uploadData)                               
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
  titleText: any = '';
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

  editorText: any = '';
  onContentChanged = (event: any) => {
    this.editorText = event.html;
    this.editorText = this.editorText.replace(/src="blob:/g, 'src="');
    console.log(this.editorText);
  };
  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };
   get blogFields() {
    return {
      title: this.titleText,
      type: this.SelectedValue,
      description: this.editorText,
      creator: this.authService.getUserId(),
      images: this.uploadedImageURLs,
    };
  }

  @Input() options: string[] = [
    'Technical',
    'Travel',
    'Food',
    'Fashion',
    'Nature',
    'Story',
    'LifeStyle',
  ];
  @Input() SelectedValue: string = '';
  @Output() valueChange = new EventEmitter<string>();
  selectOption(option: string) {
    this.SelectedValue = option;
    this.valueChange.emit(this.SelectedValue);
    this.isOpen = false;
  }
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  fileImage: any;
  onSelectValue(e: any) {}
}
