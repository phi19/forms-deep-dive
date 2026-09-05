import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth-service';
import { mustContainQuestionMarkValidator } from '../../validators/must-contain-question-mark-validator';
import { uniqueEmailValidator } from '../../validators/unique-email-validator';
import { debounceTime } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-reactive-login',
  styleUrl: './reactive-login.css',
  templateUrl: './reactive-login.html',
})
export class ReactiveLogin implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [uniqueEmailValidator(this.authService)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMarkValidator],
    }),
  });

  ngOnInit(): void {
    const stringifiedSavedForm = window.localStorage.getItem('saved-login-form');

    if (stringifiedSavedForm) {
      const savedForm = JSON.parse(stringifiedSavedForm);
      this.form.patchValue({ email: savedForm.email });
    }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (form) => {
        const loginForm = JSON.stringify({ email: form['email'] });
        window.localStorage.setItem('saved-login-form', loginForm);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSubmit() {
    const { email, password } = this.form.controls;
    console.log(email, password);
  }

  private isInputInvalid(input: AbstractControl): boolean {
    return (input.touched || input.dirty) && input.invalid;
  }

  // NOTE: the computed function doesn't work here because this.form.controls isn't a signal
  get isEmailInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.email);
  }

  get isPasswordInvalid(): boolean {
    return this.isInputInvalid(this.form.controls.password);
  }
}
