import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupFormService } from '../signup-form-service';
import { isInputInvalid } from '../../../utils/isInputInvalid';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-address-form-component',
  styleUrl: './address-form-component.css',
  templateUrl: './address-form-component.html',
  providers: [SignupFormService],
})
export class AddressFormComponent {
  private signupFormService = inject(SignupFormService);
  form = this.signupFormService.form;

  get isStreetAddressInvalid(): boolean {
    return isInputInvalid(this.form.controls.address.controls.streetAddress);
  }

  get isStreetAddressEmpty(): boolean {
    return (
      this.isStreetAddressInvalid &&
      this.form.controls.address.controls.streetAddress.errors?.['required']
    );
  }

  get isStreetNumberInvalid(): boolean {
    return isInputInvalid(this.form.controls.address.controls.streetNumber);
  }

  get isStreetNumberEmpty(): boolean {
    return (
      this.isStreetNumberInvalid &&
      this.form.controls.address.controls.streetNumber.errors?.['required']
    );
  }

  get isPostalCodeInvalid(): boolean {
    return isInputInvalid(this.form.controls.address.controls.postalCode);
  }

  get isPostalCodeEmpty(): boolean {
    return (
      this.isPostalCodeInvalid &&
      this.form.controls.address.controls.postalCode.errors?.['required']
    );
  }

  get isCityInvalid(): boolean {
    return isInputInvalid(this.form.controls.address.controls.city);
  }

  get isCityEmpty(): boolean {
    return this.isCityInvalid && this.form.controls.address.controls.city.errors?.['required'];
  }
}
