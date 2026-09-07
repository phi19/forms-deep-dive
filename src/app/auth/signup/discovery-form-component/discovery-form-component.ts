import { Component, inject } from '@angular/core';
import { SignupFormService } from '../signup-form-service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-discovery-form-component',
  styleUrl: './discovery-form-component.css',
  templateUrl: './discovery-form-component.html',
})
export class DiscoveryFormComponent {
  private signupFormService = inject(SignupFormService);
  form = this.signupFormService.form;

  get isDiscoveryInvalid(): boolean {
    return this.form.controls.discovery.invalid;
  }

  get hasDiscoveryManyOptionsSelected(): boolean {
    return (
      this.isDiscoveryInvalid &&
      this.form.controls.discovery.errors?.['discoveryHasManyOptionsSelected']
    );
  }

  get hasDiscoveryOnlyOneOptionSelected(): boolean {
    return (
      this.isDiscoveryInvalid &&
      this.form.controls.discovery.errors?.['discoveryHasOnlyOneOptionSelected']
    );
  }
}
