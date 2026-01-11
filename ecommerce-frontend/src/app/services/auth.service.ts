import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginDto, RegisterDto, AuthResponse, User } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject. asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Load user from localStorage on service initialization
    this.loadUserFromStorage();
  }

  // Register new user
  register(registerDto:  RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerDto)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  // Login user
  login(loginDto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginDto)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject. value;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles. includes(role) ?? false;
  }

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Handle authentication response
  private handleAuthResponse(response: AuthResponse): void {
    // Store token
    localStorage.setItem('token', response.token);

    // Create user object
    const user: User = {
      email: response. email,
      firstName: response. firstName,
      lastName: response. lastName,
      roles: response. roles
    };

    // Store user
    localStorage.setItem('user', JSON. stringify(user));
    this.currentUserSubject. next(user);
  }

  // Load user from localStorage
  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.currentUserSubject.next(user);
    }
  }
}