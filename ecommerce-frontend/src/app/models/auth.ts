export interface RegisterDto {
  email: string;
  password:  string;
  firstName: string;
  lastName: string;
}

export interface LoginDto {
  email: string;
  password:  string;
}

export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}