import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormManagerService {
  hasErrors(
    formControlName: string,
    formGroup: FormGroup,
    secondaryInput?: string,
    formSubmitted?: boolean
  ) {
    let formInput: any = null;
    if (secondaryInput) {
      formInput = formGroup.get(secondaryInput)?.get(formControlName);
    } else {
      formInput = formGroup.get(formControlName);
    }
    if (!formInput) return false;
    const errorViewable = formSubmitted || formInput.touched;
    return formInput.invalid && errorViewable && !!formInput.errors;
  }

  formSectionValidity(formGroup: FormGroup, inputs: string[]) {
    let isValid = true;
    for (let input of inputs) {
      const inputValidity = formGroup.get(input)?.valid;
      if (!inputValidity) {
        isValid = false;
      }
    }
    return isValid;
  }
  resetForm(formGroup: FormGroup) {
    formGroup.reset();
    formGroup.markAsPristine();
  }
}
