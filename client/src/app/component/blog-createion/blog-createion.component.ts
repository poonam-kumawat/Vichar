import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { QuillModule } from 'ngx-quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';

export const QuillConfiguration = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    // [{ header: 1 }, { header: 2 }],
    // [{ color: [] }, { background: [] }],
    // ['image'],
    // ['link'],
    ['link', 'image', 'video'],

    ['clean'],
  ],
};

@Component({
  selector: 'app-blog-createion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillModule],
  templateUrl: './blog-createion.component.html',
  styleUrl: './blog-createion.component.css',
})
export class BlogCreateionComponent {
  quillConfiguration = QuillConfiguration;
  htmlText: any;
  titleText: any;
  constructor(private sharedService: SharedService,private router:Router) {}
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
  };
  onFocus = () => {
    console.log('On Focus');
  };
  onBlur = () => {
    console.log('Blurred');
  };
  onBlogSubmit() {
    console.log(this.fileImage)
    const object = {
      title: this.titleText,
      type: this.SelectedValue,
      description: this.editorText,
    };
    this.sharedService.blogCreateApi(object).subscribe((res:any)=>{
      this.router.navigate(['/blog'])

    });
  }
  SelectedValue: any;
  fileImage:any;
  onSelectValue(e: any) {
  }
}
