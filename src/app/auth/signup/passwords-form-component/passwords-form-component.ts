import { Component, inject } from '@angular/core';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { SignupFormService } from '../signup-form-service';
import { isInputInvalid } from '../../../utils/isInputInvalid';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-passwords-form-component',
  styleUrl: './passwords-form-component.css',
  templateUrl: './passwords-form-component.html',
})
export class PasswordsFormComponent {
  private signupFormService = inject(SignupFormService);
  form = this.signupFormService.form;

  get isPasswordInvalid(): boolean {
    return isInputInvalid(this.form.controls.passwords.controls.password);
  }

  get isPasswordTooSmall(): boolean {
    return (
      this.isPasswordInvalid && this.form.controls.passwords.controls.password.errors?.['minlength']
    );
  }

  get doesPasswordLackUpperCaseCharacters(): boolean {
    return (
      this.isPasswordInvalid &&
      this.form.controls.passwords.controls.password.errors?.['lacksUpperCase']
    );
  }

  get doesPasswordLackLowerCaseCharacters(): boolean {
    return (
      this.isPasswordInvalid &&
      this.form.controls.passwords.controls.password.errors?.['lacksLowerCase']
    );
  }

  get doesPasswordLackNumberCharacters(): boolean {
    return (
      this.isPasswordInvalid &&
      this.form.controls.passwords.controls.password.errors?.['lacksNumber']
    );
  }

  get isPasswordConfirmationInvalid(): boolean {
    return isInputInvalid(this.form.controls.passwords.controls.passwordConfirmation);
  }

  get isPasswordConfirmationDifferentFromPassword(): boolean {
    return (
      this.isPasswordConfirmationInvalid &&
      this.form.controls.passwords.controls.passwordConfirmation.errors?.['notEqual']
    );
  }
}
