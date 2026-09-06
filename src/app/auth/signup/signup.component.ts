import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { uniqueEmailValidator } from '../../validators/unique-email-validator';
import { AuthService } from '../auth-service';
import { passwordStrengthValidator } from '../../validators/password-strength.validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  private authService = inject(AuthService);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [uniqueEmailValidator(this.authService)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), passwordStrengthValidator],
    }),
  });

  private isInputInvalid(input: AbstractControl): boolean {
    return (input.touched || input.dirty) && input.invalid;
  }

  get isEmailInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.email);
  }

  get isEmailEmpty(): boolean {
    return this.isEmailInvalid && this.form.controls.email.errors?.['required'];
  }

  get isEmailTaken(): boolean {
    return this.isEmailInvalid && this.form.controls.email.errors?.['emailExists'];
  }

  get isPasswordInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.password);
  }

  get isPasswordEmpty(): boolean {
    return this.isPasswordInvalid && this.form.controls.password.errors?.['required'];
  }

  get isPasswordTooSmall(): boolean {
    return this.isPasswordInvalid && this.form.controls.password.errors?.['minlength'];
  }

  get doesPasswordLackUpperCaseCharacters(): boolean {
    return this.isPasswordInvalid && this.form.controls.password.errors?.['lacksUpperCase'];
  }

  get doesPasswordLackLowerCaseCharacters(): boolean {
    return this.isPasswordInvalid && this.form.controls.password.errors?.['lacksLowerCase'];
  }

  get doesPasswordLackNumberCharacters(): boolean {
    return this.isPasswordInvalid && this.form.controls.password.errors?.['lacksNumber'];
  }
}
