import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../../Validators/customValidator';
import { SharedService } from '../../service/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  route=inject(Router)
 constructor(private sharedService:SharedService){

 }
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


  register(){
    this.sharedService.registerApi(this.registeration.value).subscribe({
      next: (res) => {
        alert('user Created');
        this.route.navigate(['/login'])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
