import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Changez cette ligne - retirez le mot-clé "type"
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  username: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'auth_user';
  private readonly API_URL = `${environment.apiUrl}/api/auth`;
  
  private authState = signal<{username: string | null}>({
    username: null
  });
  
  public username = computed(() => this.authState().username);
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadAuthState();
  }
  
  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => {
          this.authState.set({ username: response.username });
          localStorage.setItem(this.AUTH_KEY, JSON.stringify({ username: response.username }));
        })
      );
  }
  
  logout(): void {
    this.authState.set({ username: null });
    localStorage.removeItem(this.AUTH_KEY);
    this.router.navigate(['/login']);
  }
  
  isAuthenticated(): boolean {
    return !!this.authState().username;
  }
  
  private loadAuthState(): void {
    const storedAuth = localStorage.getItem(this.AUTH_KEY);
    if (storedAuth) {
      try {
        const auth = JSON.parse(storedAuth);
        this.authState.set({ username: auth.username });
      } catch (e) {
        localStorage.removeItem(this.AUTH_KEY);
      }
    }
  }
}