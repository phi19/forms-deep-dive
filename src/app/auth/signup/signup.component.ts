import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupFormService } from './signup-form-service';
import { PasswordsFormComponent } from './passwords-form-component/passwords-form-component';
import { AddressFormComponent } from './address-form-component/address-form-component';
import { isInputInvalid } from '../../utils/isInputInvalid';
import { DiscoveryFormComponent } from './discovery-form-component/discovery-form-component';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    ReactiveFormsModule,
    PasswordsFormComponent,
    AddressFormComponent,
    DiscoveryFormComponent,
  ],
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

  get isEmailInvalid(): boolean {
    return isInputInvalid(this.form.controls.email);
  }

  get isEmailEmpty(): boolean {
    return this.isEmailInvalid && this.form.controls.email.errors?.['required'];
  }

  get isEmailTaken(): boolean {
    return this.isEmailInvalid && this.form.controls.email.errors?.['emailExists'];
  }

  get isFirstNameInvalid(): boolean {
    return isInputInvalid(this.form.controls.firstName);
  }

  get isFirstNameEmpty(): boolean {
    return this.isFirstNameInvalid && this.form.controls.firstName.errors?.['required'];
  }

  get isFirstNameTooShort(): boolean {
    return this.isFirstNameInvalid && this.form.controls.firstName.errors?.['minlength'];
  }

  get isLastNameInvalid(): boolean {
    return isInputInvalid(this.form.controls.lastName);
  }

  get isLastNameEmpty(): boolean {
    return this.isLastNameInvalid && this.form.controls.lastName.errors?.['required'];
  }

  get isLastNameTooShort(): boolean {
    return this.isLastNameInvalid && this.form.controls.lastName.errors?.['minlength'];
  }

  get isPhoneNumberInvalid(): boolean {
    return isInputInvalid(this.form.controls.phoneNumber);
  }

  get isPhoneNumberEmpty(): boolean {
    return this.isPhoneNumberInvalid && this.form.controls.phoneNumber.errors?.['required'];
  }

  get doesPhoneNumberNotFollowPattern(): boolean {
    return this.isPhoneNumberInvalid && this.form.controls.phoneNumber.errors?.['pattern'];
  }

  private get isTermsAndConditionsInvalid(): boolean {
    return this.form.controls.termsAndConditions.invalid;
  }

  get isTermsAndConditionsFalse(): boolean {
    return (
      this.isTermsAndConditionsInvalid && this.form.controls.termsAndConditions.errors?.['required']
    );
  }
}
