import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { SharedService } from '../../service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-update-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, QuillModule],
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.css',
})
export class UpdateBlogComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  quillConfiguration = QuillConfiguration;
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
  ngOnInit(): void {
    this.onDetailDisplay();
  }

  onDetailDisplay() {
    const id = this.route.snapshot.paramMap.get('id');

    const body = {
      _id: id,
    };
    this.sharedService.detailBlogApi(body).subscribe((res: Response) => {
      this.detailBlog = res;
      console.log(this.detailBlog);
      const blogDetail = this.detailBlog.find((item: any) => item._id === id);
      if (blogDetail) {
        this.idDelete = blogDetail._id;
        this.tilteData = blogDetail.title;
        this.htmlText = blogDetail.description;
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
  cancelEdit(){
    this.isupdate = false;
  }
}
