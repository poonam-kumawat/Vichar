import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { CommonModule } from '@angular/common';
import { parse } from 'angular-html-parser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs-dashboard.component.html',
  styleUrl: './blogs-dashboard.component.css',
})
export class BlogsDashboardComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private sharedService: SharedService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.ongetBlogs();
  }

  blogsData: any;

  ongetBlogs() {
    this.sharedService.getBlogApi().subscribe((data) => {
      this.blogsData = data;
      console.log(this.blogsData);
    });
  }
  OnNavigate(id: any) {
    this.router.navigate([`/update`, id]);
  }
  onNewBlog() {
    this.router.navigate([`/create-blog`]);
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
    this.router.navigate(['login'])
  }
  onSignUp(){
this.router.navigate(['register']);
  }
}
