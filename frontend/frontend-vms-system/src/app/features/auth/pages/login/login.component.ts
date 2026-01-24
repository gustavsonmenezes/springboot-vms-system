import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    console.log('📤 Enviando login...');

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('✅ Login bem-sucedido:', response);
        this.loading = false;

        // Navegar para lista de VMs
        this.router.navigate(['/virtual-machines/list']).then(
          (success) => console.log('✅ Navegação sucesso:', success),
          (error) => console.error('❌ Erro navegação:', error)
        );
      },
      error: (error) => {
        console.error('❌ Erro no login:', error);
        this.loading = false;
        this.errorMessage = 'Email ou senha inválidos';
      }
    });
  }

  getEmailErrorMessage(): string {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email é obrigatório';
    }
    if (emailControl?.hasError('email')) {
      return 'Email inválido';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Senha é obrigatória';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Senha deve ter no mínimo 6 caracteres';
    }
    return '';
  }
}
