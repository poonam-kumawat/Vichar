import { Component, OnInit, inject } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderBlogComponent } from '../header-blog/header-blog.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, HeaderBlogComponent, FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    public authService:AuthService
  ) {}

  ngOnInit(): void {
    this.onhandleProfile();
  }
  profileName: any = '';
  aboutProfile: any = '';
  profileDetails: any;
  profileId: any;
  onhandleProfile() {
    const id = this.route.snapshot.paramMap.get('id');
    this.sharedService.getProfileApi(id).subscribe((res: any) => {
      this.profileDetails = res;
      this.profileId = this.profileDetails.find((data: any) => data);
      console.log(this.profileDetails);
      this.profileName = this.profileId.name;
      this.aboutProfile = this.profileId.about;
      this.displayPicture = this.profileId.profilePicture;
    });
  }

  displayPicture: any;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const uploadImage = new FormData();
    uploadImage.append('file', file, file.name);
    this.sharedService
      .profileUploadApi(uploadImage)
      .subscribe((response: any) => {
        if (response && response.url) {
          this.displayPicture = response.url;
          console.log(response.url);
        }
      });
  }

  onProfileUpdate() {
    const body = {
      id: this.profileId._id,
      name: this.profileName,
      about: this.aboutProfile,
      profilePicture: this.displayPicture,
    };
    this.sharedService.editProfileApi(body).subscribe(() => {
      this.onhandleProfile();
    });
  }
  OnNavigate(id: any) {
    this.router.navigate([`/update`, id]);
  }
  onNewBlog() {
    if (this.authService.isLoggedIn()) {
      this.authService.setBlogCreation(true);

      this.router.navigate([`/create-blog`]);
    } else {
      this.router.navigate([`/login`]);
    }
  }
}
