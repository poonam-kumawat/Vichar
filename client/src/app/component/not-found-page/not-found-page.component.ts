import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DotLottie } from '@lottiefiles/dotlottie-web';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.css',
})
export class NotFoundPageComponent {
  constructor(private router:Router){}

  onPageNotFound(){
    this.router.navigate(['/']);
  }
  
}
