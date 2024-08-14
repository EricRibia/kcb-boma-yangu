import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
})
export class PasswordInputComponent {
  @Input() parentFormGroup?: FormGroup;
  @Input() controlInputName = '';
  @Input() prefixClasses = '';
  @Input() containerClasses = '';
  @Input() twClasses = '';
  @Input() placeholder = '';
  @Input() hasErrors: boolean = false;
  @Input() passwordVisible: boolean = false;
  @Input() maxLength: number = 255;
}
