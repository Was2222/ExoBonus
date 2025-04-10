import { Component, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { AuthService } from "../../../core/services/auth.service"
import { finalize } from "rxjs"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Authentication</h1>
        
        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username" 
              placeholder="Enter your username"
              [class.invalid]="isFieldInvalid('username')"
            >
            <div *ngIf="isFieldInvalid('username')" class="error-hint">
              Username is required
            </div>
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              placeholder="Enter your password"
              [class.invalid]="isFieldInvalid('password')"
            >
            <div *ngIf="isFieldInvalid('password')" class="error-hint">
              Password is required
            </div>
          </div>
          
          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isLoading"
            class="login-button"
          >
            <span *ngIf="isLoading">Logging in...</span>
            <span *ngIf="!isLoading">Login</span>
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [
    `
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #1d2936; /* Dark background */
    }
    
    .login-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #1d2936; /* Title in dark blue */
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #1d2936;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    input.invalid {
      border-color: #dc3545;
    }
    
    .error-hint {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    
    .login-button {
      width: 100%;
      padding: 0.75rem;
      background-color: #6a9726; /* Green button */
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .login-button:hover:not(:disabled) {
      background-color: #5a8520;
    }
    
    .login-button:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }
    
    .error-message {
      background-color: #ffebee;
      color: #c62828;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1.5rem;
      text-align: center;
    }
  `,
  ],
})
export class LoginComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  loginForm: FormGroup = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]],
  })

  isLoading = false
  errorMessage: string | null = null

  onSubmit(): void {
    if (this.loginForm.invalid) return

    this.isLoading = true
    this.errorMessage = null

    const credentials = this.loginForm.value

    this.authService
      .login(credentials)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(["/dashboard"])
        },
        error: (error) => {
          console.error("Login error:", error)
          this.errorMessage = error.error?.message || "Authentication failed. Please check your credentials."
        },
      })
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field)
    return !!control && control.invalid && (control.dirty || control.touched)
  }
}
