import { FormGroup } from "@angular/forms"
export const confirmPasswordValidator = (
  controlName: string,
  controlNameToMatch: string
) => {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const controlToMatch = formGroup.controls[controlNameToMatch];

    if (
      controlToMatch.errors &&
      !controlToMatch.errors['confirmPasswordValidator']
    ) {
      return;
    }

    if (control.value !== controlToMatch.value) {
      controlToMatch.setErrors({ confirmPasswordValidator: true });
    } else {
      controlToMatch.setErrors(null);
    }
  };
};