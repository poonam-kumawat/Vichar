import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmPasswordValidator } from '../../Validators/customValidator';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  public showPassword: any;
  public showPasswordOnPress: any;
  public showConfirmedPassword: any;
  public showConfirmedPasswordOnPress: any;
  fb = inject(FormBuilder);
  route = inject(Router);
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  registeration!: FormGroup;
  ngOnInit(): void {
    this.registeration = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  register() {
    if (this.registeration.invalid) {
      this.registeration.markAllAsTouched();
      return;
    }
    this.sharedService.registerApi(this.registeration.value).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(
          res.success.message || 'Registered Successfully',
          'SUCCESS',
          {
            timeOut: 2000,
          }
        );
        this.route.navigate(['login']);
      },
      error: (err) => {
        this.toastr.error(
          err.error.message._message || 'User validation failed',
          'ERROR',
          {
            timeOut: 2000,
          }
        );

        console.log(err);
      },
    });
  }
  onLogin() {
    this.router.navigate(['login']);
  }
}
