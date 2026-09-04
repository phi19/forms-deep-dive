import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-reactive-login',
  styleUrl: './reactive-login.css',
  templateUrl: './reactive-login.html',
})
export class ReactiveLogin {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    }),
  });

  onSubmit() {
    console.log(this.form);
    const { email, password } = this.form.controls;
    console.log(email, password);
  }

  private isInputInvalid(input: AbstractControl): boolean {
    return input.touched && input.dirty && input.invalid;
  }

  // NOTE: the computed function doesn't work here because this.form.controls isn't a signal
  get isEmailInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.email);
  }

  get isPasswordInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.password);
  }
}
