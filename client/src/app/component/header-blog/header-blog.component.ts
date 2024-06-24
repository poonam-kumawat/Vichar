import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-blog.component.html',
  styleUrl: './header-blog.component.css',
})
export class HeaderBlogComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private router: Router
  ) {}
  @Input() publishData: any;

  isBlogCreation: any;
  ngOnInit(): void {
    this.isBlogCreation = this.authService.getBlogCreation();
  }
  onPublish() {
    this.sharedService.blogCreateApi(this.publishData).subscribe((res: any) => {
      this.router.navigate(['/']);
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
  onBlogPage() {
    this.router.navigate(['/']);
  }
}
