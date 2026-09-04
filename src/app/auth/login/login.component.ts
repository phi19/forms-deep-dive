import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  onSubmit(form: NgForm) {
    if (form.form.invalid) {
      return;
    }

    const email = form.form.controls['email'];
    const password = form.form.controls['password'];

    console.log(email, password);
  }

  isFormInvalid(form: NgForm): boolean {
    return form.submitted && form.form.invalid;
  }

  isInputInvalid(input: NgModel): boolean {
    return (input.touched && input.dirty && input.invalid) ?? false;
  }
}
