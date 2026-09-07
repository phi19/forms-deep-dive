import { inject, Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { uniqueEmailValidator } from '../../validators/unique-email-validator';
import { passwordStrengthValidator } from '../../validators/password-strength-validator';
import { equivalentValidator } from '../../validators/equivalent-validator';
import { eitherOrTrueValidator } from '../../validators/either-or-true-validator';
import { AuthService } from '../auth-service';

@Injectable()
export class SignupFormService {
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
    discovery: new FormArray(
      [new FormControl(false), new FormControl(false), new FormControl(false)],
      {
        validators: [eitherOrTrueValidator()],
      },
    ),
    termsAndConditions: new FormControl(false, {
      validators: [Validators.requiredTrue],
    }),
  });
}
