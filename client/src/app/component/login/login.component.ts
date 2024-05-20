import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../service/shared.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  constructor(private sharedService: SharedService) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: ['', Validators.required],        
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
