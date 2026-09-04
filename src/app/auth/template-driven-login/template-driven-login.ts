import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  imports: [FormsModule],
  selector: 'app-template-driven-login',
  styleUrl: './template-driven-login.css',
  templateUrl: './template-driven-login.html',
})
export class TemplateDrivenLogin {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');

      if (savedForm) {
        const email = JSON.parse(savedForm).email;
        setTimeout(() => {
          this.form().controls['email']?.setValue(email);
        }, 1);
      }

      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (form) => {
            const loginForm = JSON.stringify({ email: form['email'] });
            window.localStorage.setItem('saved-login-form', loginForm);
          },
        });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      });
    });
  }

  onSubmit(form: NgForm) {
    if (form.form.invalid) {
      return;
    }

    const email = form.form.controls['email'];
    const password = form.form.controls['password'];

    console.log(email.value, password.value);

    form.form.reset();
  }

  isFormInvalid(form: NgForm): boolean {
    return form.submitted && form.form.invalid;
  }

  isInputInvalid(input: NgModel): boolean {
    return (input.touched && input.dirty && input.invalid) ?? false;
  }
}
