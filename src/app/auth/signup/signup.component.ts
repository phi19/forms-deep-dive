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
import { passwordStrengthValidator } from '../../validators/password-strength-validator';
import { equivalentValidator } from '../../validators/equivalent-validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {
  private authService = inject(AuthService);

  form = new FormGroup(
    {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        asyncValidators: [uniqueEmailValidator(this.authService)],
      }),
      password: new FormControl('', {
        validators: [Validators.minLength(6), passwordStrengthValidator],
      }),
      passwordConfirmation: new FormControl(''),
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
      }),
      streetAddress: new FormControl('', {
        validators: [Validators.required],
      }),
      phoneNumber: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/^[+]{1}[- ()0-9]{7,16}$/)],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
      role: new FormControl('student', {}),
    },
    {
      validators: [equivalentValidator('password', 'passwordConfirmation')],
    },
  );

  resetForm(): void {
    this.form.reset();
  }

  submitForm(): void {
    const controls = this.form.value;
    console.log(this.form, 14941);

    if (this.form.invalid) {
      return;
    }

    console.log('SUCCESS');
  }

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

  get isPasswordConfirmationInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.passwordConfirmation);
  }

  get isPasswordConfirmationDifferentFromPassword(): boolean {
    return (
      this.isPasswordConfirmationInvalid &&
      this.form.controls.passwordConfirmation.errors?.['notEqual']
    );
  }

  get isFirstNameInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.firstName);
  }

  get isFirstNameEmpty(): boolean {
    return this.isFirstNameInvalid && this.form.controls.firstName.errors?.['required'];
  }

  get isFirstNameTooShort(): boolean {
    return this.isFirstNameInvalid && this.form.controls.firstName.errors?.['minlength'];
  }

  get isLastNameInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.lastName);
  }

  get isLastNameEmpty(): boolean {
    return this.isLastNameInvalid && this.form.controls.lastName.errors?.['required'];
  }

  get isLastNameTooShort(): boolean {
    return this.isLastNameInvalid && this.form.controls.lastName.errors?.['minlength'];
  }

  get isStreetAddressInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.streetAddress);
  }

  get isStreetAddressEmpty(): boolean {
    return this.isStreetAddressInvalid && this.form.controls.streetAddress.errors?.['required'];
  }

  get isPhoneNumberInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.phoneNumber);
  }

  get isPhoneNumberEmpty(): boolean {
    return this.isPhoneNumberInvalid && this.form.controls.phoneNumber.errors?.['required'];
  }

  get doesPhoneNumberNotFollowPattern(): boolean {
    return this.isPhoneNumberInvalid && this.form.controls.phoneNumber.errors?.['pattern'];
  }

  get isPostalCodeInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.postalCode);
  }

  get isPostalCodeEmpty(): boolean {
    return this.isPostalCodeInvalid && this.form.controls.postalCode.errors?.['required'];
  }

  get isCityInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.city);
  }

  get isCityEmpty(): boolean {
    return this.isCityInvalid && this.form.controls.city.errors?.['required'];
  }
}
