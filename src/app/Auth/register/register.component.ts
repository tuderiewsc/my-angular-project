import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  errorMessage: string;


  constructor(private formbuilder: FormBuilder, private validateservice: ValidateService
    , private auth: AuthService, private router: Router) { }

  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.compose([
    Validators.required,
    Validators.email
  ])]);
  password = new FormControl('', [Validators.compose([
    Validators.required,
    Validators.minLength(6)
  ])]);
  password_confirmation = new FormControl('', [Validators.required]);

  registerForm: FormGroup = this.formbuilder.group({
    name: this.name,
    email: this.email,
    password: this.password,
    password_confirmation: this.password_confirmation,
  }, { validator: this.validateservice.matchingPasswords('password', 'password_confirmation') });

  register(value: any) {
    this.auth.register(value).subscribe(res => {
      if (res) {
        this.router.navigateByUrl('');
      }
    }, err => {
      if (err.status === 400) {
        const message = err.error.message;
        this.errorMessage = message[Object.keys(message)[0]];
      }
    }

    );

  }


  ngOnInit() {
  }






}
