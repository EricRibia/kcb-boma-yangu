import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PasswordInputComponent } from '../password-input/password-input.component';
import { FormManagerService } from '../../../services/form-manager.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-input-control',
  standalone: true,
  imports: [PasswordInputComponent, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
})
export class InputControlComponent {
  @Input({ required: true }) controlInputName: string = '';
  @Input() formSubmitted: boolean = false;
  @Input() isProcessingTrigger: boolean = false;
  @Input() maxLength: number = 255;
  @Input() prefix: string = '';
  @Input() inputType: string = 'text';
  @Input() triggerName: string = 'Process';
  @Input() inputStyle:
    | 'normal'
    | 'selectDropdown'
    | 'password'
    | 'triggerBtn'
    | 'textArea'
    | 'phoneNumber' = 'normal';
  @Input() prefixClasses: string = '';
  @Input() label: string = '';
  @Input() labelTwClasses: string = '';
  @Input() containerClasses: string = '';
  @Input() selectInputOptions:
    | {
        label: string;
        value: any;
        img?: string;
      }[]
    | null = [];
  @Input() twClasses: string = '';
  @Input() placeholder: string = '';
  @Output() chooseCountryCode = new EventEmitter();
  @Output() trigger = new EventEmitter();
  get hasErrors() {
    if (!this.parentFormGroup) return false;
    return this.formManager.hasErrors(
      this.controlInputName,
      this.parentFormGroup,
      '',
      this.formSubmitted
    );
  }
  parentContainer = inject(ControlContainer);
  get parentFormGroup() {
    return this.parentContainer.control as FormGroup;
  }
  constructor(private formManager: FormManagerService) {}
  passwordVisible = false;
  changePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  updateFormControl(val: any) {
    this.parentFormGroup.get(this.controlInputName)?.setValue(val);
  }
}
