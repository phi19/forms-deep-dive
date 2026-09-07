import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';

import { AuthService } from '../auth-service';
import { mustContainQuestionMarkValidator } from '../../validators/must-contain-question-mark-validator';
import { fetchStoredEmail, storeEmail } from '../../utils/store';
import { existingEmailValidator } from '../../validators/existing-email-validator';
import { isInputInvalid } from '../../utils/isInputInvalid';

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
    email: new FormControl(fetchStoredEmail(), {
      validators: [Validators.required, Validators.email],
      asyncValidators: [existingEmailValidator(this.authService)],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMarkValidator],
    }),
  });

  ngOnInit(): void {
    const initialEmailValue = fetchStoredEmail();
    if (initialEmailValue !== '') {
      this.form.controls.email.markAsDirty();
    }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (form) => {
        const email = form.email;

        if (typeof email === 'string') {
          storeEmail(email);
        }
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

  // NOTE: the computed function doesn't work here because this.form.controls isn't a signal
  get isEmailInvalid(): boolean {
    return isInputInvalid(this.form.controls.email);
  }

  get isPasswordInvalid(): boolean {
    return isInputInvalid(this.form.controls.password);
  }
}
