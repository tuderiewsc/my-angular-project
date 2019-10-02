import { Injectable } from '@angular/core';
import { group } from '@angular/animations';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }


  public matchingPasswords(passwordkey: string, confirmpasswordkey: string) {
    return (group: FormGroup): {
      [keys: string]: any
    } => {
      const password = group.controls[passwordkey];
      const confirmpassword = group.controls[confirmpasswordkey];

      if (password.value !== confirmpassword.value) {
        return {
          mismatchpassword: true
        };
      }
    };
  }
}
