import { Component } from '@angular/core';
import { ReactiveLogin } from './auth/reactive-login/reactive-login';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [ReactiveLogin],
})
export class App {}
