import { Component, Input } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-header-blog',
  standalone: true,
  imports: [],
templateUrl: './header-blog.component.html',
  styleUrl: './header-blog.component.css',
})
export class HeaderBlogComponent {
  constructor(private authService:AuthService,private sharedService: SharedService, private router: Router) {}
  @Input() publishData: any;
  onPublish() {
    this.sharedService.blogCreateApi(this.publishData).subscribe((res: any) => {
      this.router.navigate(['/blog']);
    });
  }
  onProfileView() {
    if (this.authService.isLoggedIn()) {
      const id = this.authService.getUserId();
      this.router.navigate([`/profile`, id]);
    } else {
      this.router.navigate([`/login`]);
    }
  }
}
