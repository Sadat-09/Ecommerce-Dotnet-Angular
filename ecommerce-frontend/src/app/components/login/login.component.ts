import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: LoginDto = {
    email: '',
    password: ''
  };

  loading = false;
  error = '';
  returnUrl = '/products';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Get return url from route parameters or default to '/products'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/products';
  }

  onSubmit(): void {
    this.loading = true;
    this. error = '';

    this.authService.login(this.loginData).subscribe({
      next: () => {
        this.router. navigate([this.returnUrl]);
      },
      error: (err) => {
        this.error = err.error?.message || 'Invalid email or password';
        this.loading = false;
      }
    });
  }
}