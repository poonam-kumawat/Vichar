import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ImageHandler, Options } from 'ngx-quill-upload';
import Quill from 'quill';
Quill.register('modules/imageHandler', ImageHandler);


@Component({
  selector: 'app-quill',
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quill.component.html',
  styleUrl: './quill.component.css',
})
export class QuillComponent {
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
              if (file.size < 1000000) {
                const uploadData = new FormData();
                console.log('>>>', uploadData);
                uploadData.append('file', file, file.name);
                // uploadData.append('file', file.name);
                console.log('>>>', uploadData);

                return this.http
                  .post('http://localhost:5000/api/quill/upload', uploadData)
                  .toPromise()
                  .then((result: any) => {
                    console.log(result);
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

  onSelectionChanged = (event: any) => {
    if (event.oldRange == null) {
    }
    if (event.range == null) {
    }
  };
  editorText: any;
  onContentChanged = (event: any) => {
    this.editorText = event.html;
    this.editorText = this.editorText.replace(/src="blob:/g, 'src="');
    console.log(this.editorText);
  };
}
