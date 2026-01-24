import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, of, delay } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../../shared/models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // LOGIN SIMULADO - aceita qualquer email/senha válidos
    console.log('🔐 Login simulado com:', credentials);

    const fakeResponse: LoginResponse = {
      token: 'fake-jwt-token-' + Date.now(),
      email: credentials.email,
      name: credentials.email.split('@')[0]
    };

    this.setSession(fakeResponse);
    return of(fakeResponse).pipe(delay(500)); // Simula delay da API

    // DESCOMENTE quando o backend estiver pronto:
    // return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
    //   tap(response => {
    //     this.setSession(response);
    //   })
    // );
  }

  private setSession(authResult: LoginResponse): void {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify({
      email: authResult.email,
      name: authResult.name
    }));
    this.currentUserSubject.next({
      email: authResult.email,
      name: authResult.name
    });
    console.log('✅ Sessão salva:', authResult);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const hasToken = !!localStorage.getItem('token');
    console.log('🔍 Verificando login:', hasToken);
    return hasToken;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUserSubject.next(JSON.parse(userStr));
    }
  }
}
