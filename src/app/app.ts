import { Component } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [LoginComponent],
})
export class App {}
