import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-submit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-submit.component.html',
  styleUrl: './input-submit.component.css',
})
export class InputSubmitComponent {
  @Input() twClasses = '';

  @Input() label = 'Login';
  @Input() type: string = 'submit';
  @Input() isProcessing: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() hasPlus: boolean = false;
  @Output() submitForm = new EventEmitter();

  handleClick() {
    if (this.type == 'button') {
      this.submitForm.emit();
    }
  }
}
