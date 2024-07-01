import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../service/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
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
    @Inject(PLATFORM_ID) private platformId: object,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }
  handleGoogleSignIn(response: any) {
    this.sharedService.googleLoginApi(response.credential).subscribe(
      (res) => {
        this.router.navigate(['/']);
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
        console.log(res);
        this.authService.saveUserId(res.data._id);
        this.toastr.success('Login Successfull!', 'Success!', {
          timeOut: 2000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('Incorrect Credentials', 'ERROR', { timeOut: 2000 });
      },
    });
  }
  onResgister() {
    this.router.navigate(['register']);
  }
  public showPassword: any;
  public showPasswordOnPress: any;
}
