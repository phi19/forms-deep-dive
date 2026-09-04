import { Component } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { TemplateDrivenLogin } from "./auth/template-driven-login/template-driven-login";

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  imports: [LoginComponent, TemplateDrivenLogin],
})
export class App {}
