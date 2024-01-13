import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  registrationForm: FormGroup;
  showPassword = false;
  showError = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility(visible: boolean) {
    this.showPassword = visible;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { email, password } = this.registrationForm.value;
      this.userService.login(email, password).catch(() => {
        this.showError = true;
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
