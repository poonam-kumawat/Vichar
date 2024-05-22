import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../service/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
declare const google: any;
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      google.accounts.id.initialize({
        client_id:
          '80200947676-gmvfbgc1pm3v2das68roah9mfqfoodq5.apps.googleusercontent.com',
        callback: this.handleGoogleSignIn.bind(this),
      });

      google.accounts.id.renderButton(document.getElementById('buttonDiv'), {
        theme: 'outline',
        size: 'large',
      });
    }
      this.loginForm = this.fb.group({
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: ['', Validators.required],
      });
    
  }
  handleGoogleSignIn(response: any) {
    this.sharedService.googleLoginApi(response.credential).subscribe(
      (res) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Google login error', error);
      }
    );
  }

  login() {
    console.log(this.loginForm.value);
    this.sharedService.loginApi(this.loginForm.value).subscribe({
      next: (res) => {
        alert('user Login successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
