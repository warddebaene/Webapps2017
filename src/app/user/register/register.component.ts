import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray,  AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';


  function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? { 'passwordTooShort': 
      { requiredLength: length, actualLength: control.value.length } } : null;
  	};
	}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 public user: FormGroup;
  constructor() { }

  ngOnInit() {
  this.user = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)], 
        this.serverSideValidateUsername()],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, passwordValidator(6)]],
        confirmPassword: ['', Validators.required]
      }, { validator: comparePasswords })
    });
  }


}
