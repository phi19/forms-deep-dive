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
import { eitherOrTrueValidator } from '../../validators/either-or-true-validator';

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
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.minLength(6), passwordStrengthValidator],
        }),
        passwordConfirmation: new FormControl(''),
      },
      {
        validators: [equivalentValidator('password', 'passwordConfirmation')],
      },
    ),
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    phoneNumber: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^[+]{1}[- ()0-9]{7,16}$/)],
    }),
    address: new FormGroup({
      streetAddress: new FormControl('', {
        validators: [Validators.required],
      }),
      streetNumber: new FormControl('', { validators: [Validators.required] }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {}),
    discovery: new FormGroup(
      {
        discoveryThroughGoogle: new FormControl(false),
        discoveryThroughReferral: new FormControl(false),
        discoveryThroughOther: new FormControl(false),
      },
      {
        validators: [
          eitherOrTrueValidator(
            'discoveryThroughGoogle',
            'discoveryThroughReferral',
            'discoveryThroughOther',
          ),
        ],
      },
    ),
    termsAndConditions: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });

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
    return this.isInputInvalid(this.form.controls.passwords.controls.password);
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
    return this.isInputInvalid(this.form.controls.passwords.controls.passwordConfirmation);
  }

  get isPasswordConfirmationDifferentFromPassword(): boolean {
    return (
      this.isPasswordConfirmationInvalid &&
      this.form.controls.passwords.controls.passwordConfirmation.errors?.['notEqual']
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

  get isPhoneNumberInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.phoneNumber);
  }

  get isPhoneNumberEmpty(): boolean {
    return this.isPhoneNumberInvalid && this.form.controls.phoneNumber.errors?.['required'];
  }

  get doesPhoneNumberNotFollowPattern(): boolean {
    return this.isPhoneNumberInvalid && this.form.controls.phoneNumber.errors?.['pattern'];
  }

  get isStreetAddressInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.address.controls.streetAddress);
  }

  get isStreetAddressEmpty(): boolean {
    return (
      this.isStreetAddressInvalid &&
      this.form.controls.address.controls.streetAddress.errors?.['required']
    );
  }

  get isStreetNumberInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.address.controls.streetNumber);
  }

  get isStreetNumberEmpty(): boolean {
    return (
      this.isStreetNumberInvalid &&
      this.form.controls.address.controls.streetNumber.errors?.['required']
    );
  }

  get isPostalCodeInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.address.controls.postalCode);
  }

  get isPostalCodeEmpty(): boolean {
    return (
      this.isPostalCodeInvalid &&
      this.form.controls.address.controls.postalCode.errors?.['required']
    );
  }

  get isCityInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.address.controls.city);
  }

  get isCityEmpty(): boolean {
    return this.isCityInvalid && this.form.controls.address.controls.city.errors?.['required'];
  }

  private get isTermsAndConditionsInvalid(): boolean {
    return this.form.controls.termsAndConditions.invalid;
  }

  get isTermsAndConditionsFalse(): boolean {
    return (
      this.isTermsAndConditionsInvalid && this.form.controls.termsAndConditions.errors?.['required']
    );
  }

  get discoveryHasManyOptionsSelected(): boolean {
    return this.form.controls.discovery.errors?.['discoveryHasManyOptionsSelected'];
  }

  get discoveryHasOnlyOneOptionSelected(): boolean {
    return this.form.controls.discovery.errors?.['discoveryHasOnlyOneOptionSelected'];
  }
}
