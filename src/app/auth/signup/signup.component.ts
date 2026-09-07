import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
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
import { SignupFormService } from './signup-form-service';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
  providers: [SignupFormService],
})
export class SignupComponent {
  private signupFormService = inject(SignupFormService);
  form = this.signupFormService.form;

  resetForm(): void {
    this.form.reset();
  }

  submitForm(): void {
    const controls = this.form.value;
    console.log(this.form, 14941);

    if (this.form.invalid) {
      console.log('INVALID FORM');
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

  get isDiscoveryInvalid(): boolean {
    return this.form.controls.discovery.invalid;
  }

  get hasDiscoveryManyOptionsSelected(): boolean {
    return (
      this.isDiscoveryInvalid &&
      this.form.controls.discovery.errors?.['discoveryHasManyOptionsSelected']
    );
  }

  get hasDiscoveryOnlyOneOptionSelected(): boolean {
    return (
      this.isDiscoveryInvalid &&
      this.form.controls.discovery.errors?.['discoveryHasOnlyOneOptionSelected']
    );
  }
}
