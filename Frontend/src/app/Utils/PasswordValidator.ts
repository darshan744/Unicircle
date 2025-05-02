import {AbstractControl ,  ValidationErrors , ValidatorFn} from '@angular/forms'

const PASSWORD_REGEX: RegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-])[A-Za-z\\d!@#$%^&*()_+\\-]{8,}$');
export function isPasswordStrong(control : AbstractControl) : ValidationErrors | null{
    const value = control.value;
    if(!value) return value;
    const isStrong :boolean  = PASSWORD_REGEX.test(value);
    return isStrong ? null : {passwordIsWeak : true}
  }


