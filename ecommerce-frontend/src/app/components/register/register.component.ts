import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterDto } from '../../models/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData: RegisterDto = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };

  confirmPassword = '';
  loading = false;
  error = '';

  constructor(
    private authService:  AuthService,
    private router:  Router
  ) {}

  onSubmit(): void {
    // Check if passwords match
    if (this.registerData.password !== this. confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.router.navigate(['/products']);
      },
      error:  (err) => {
        this.error = err.error?.message || 'Registration failed.  Please try again.';
        this.loading = false;
      }
    });
  }
}