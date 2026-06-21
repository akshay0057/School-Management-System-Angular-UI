import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
        userName: ["", Validators.required],
        password: ["", Validators.required]
      });
  }

  login(){
      if(this.loginForm.invalid){
        return;
      }

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.saveToken(response.data.token);
          this.authService.saveUserClaims(response.data.username, response.data.roles);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
}
