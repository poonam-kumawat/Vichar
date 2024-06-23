import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderBlogComponent } from '../header-blog/header-blog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, HeaderBlogComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  http = inject(HttpClient);
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onhandleProfile();
  }
  profileDetails: any;
  onhandleProfile() {
    const id = this.route.snapshot.paramMap.get('id');
    this.sharedService.getProfileApi(id).subscribe((res: any) => {
      this.profileDetails = res;
      console.log(this.profileDetails);
    });
  }

  displayPicture:any;

  onFileSelected(event: any) {
    console.log(event);
    console.log(event.target.files[0].name);
    const file = event.target.files[0];
    const uploadImage = new FormData();
    console.log('>>>', uploadImage);
    uploadImage.append('file', file, file.name);
    this.http
      .post('http://localhost:5000/api/blog/upload', uploadImage)
      .subscribe((response: any) => {
        if (response && response.url) {
          this.displayPicture=response.url
          console.log(response.url)
                }
      });
  }
}
