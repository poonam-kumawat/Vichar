import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CreatorsComponent } from '../creators/creators.component';

@Component({
  selector: 'app-blogs-dashboard',
  standalone: true,
  imports: [CommonModule, CreatorsComponent],
  templateUrl: './blogs-dashboard.component.html',
  styleUrl: './blogs-dashboard.component.css',
})
export class BlogsDashboardComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private sharedService: SharedService,
    private router: Router,
    public authService: AuthService
  ) {}
  isBlogdashboard: any;
  ngOnInit(): void {
    this.isBlogdashboard = true;
    this.ongetBlogs(this.currentPage);
  }

  blogsData: any;
  currentPage: number = 1;
  totalPages: any;
  limit: number = 9;
  ongetBlogs(page: number) {
    const body = {
      page: page,
      limit: this.limit,
    };
    this.sharedService.getBlogApi(body).subscribe((data) => {
      this.blogsData = data.blogs;
      this.totalPages = Math.ceil(data.totalCount / this.limit);
    });
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.ongetBlogs(this.currentPage);
    }
  }
  onPrevPage() {
    this.onPageChange(this.currentPage - 1);
  }

  onNextPage() {
    this.onPageChange(this.currentPage + 1);
  }
  OnNavigate(id: any) {
    this.authService.setBlogCreation(false);
    this.router.navigate([`/update`, id]);
  }
  onProfileView() {
    if (this.authService.isLoggedIn()) {
      const id = this.authService.getUserId();
      this.router.navigate([`/profile`, id]);
    } else {
      this.router.navigate([`/login`]);
    }
  }

  onNewBlog() {
    if (this.authService.isLoggedIn()) {
      this.authService.setBlogCreation(true);

      this.router.navigate([`/create-blog`]);
    } else {
      this.router.navigate([`/login`]);
    }
  }
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const header = document.getElementById('header');
    if (window.pageYOffset > 50) {
      this.renderer.addClass(header, 'fixed');
    } else {
      this.renderer.removeClass(header, 'fixed');
    }
  }
  onLogin() {
    console.log(this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) this.router.navigate(['login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  onSignUp() {
    this.router.navigate(['register']);
  }

  onBlogPage() {
    this.router.navigate(['/']);
  }
  onCreators() {
    this.router.navigate(['creators']);
  }
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
 
}
