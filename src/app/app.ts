import { Component } from '@angular/core';
import { ReactiveLogin } from './auth/reactive-login/reactive-login';
import { SignupComponent } from "./auth/signup/signup.component";

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [ReactiveLogin, SignupComponent],
})
export class App {}
