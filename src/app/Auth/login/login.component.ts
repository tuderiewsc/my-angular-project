import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor(private formbuilder: FormBuilder, private validateservice: ValidateService
    , private auth: AuthService, private router: Router) { }

  email = new FormControl('', [Validators.compose([
    Validators.required,
    Validators.email
  ])]);
  password = new FormControl('', [Validators.compose([
    Validators.required,
    Validators.minLength(6)
  ])]);

  loginForm: FormGroup = this.formbuilder.group({
    email: this.email,
    password: this.password,
  });

  login(value: any) {
    this.auth.login(value).subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.auth.currentUser.next(user);
        this.router.navigateByUrl('');
      }
    }, err => {
      if (err.status === 402) {
        const message = err.error.message;
        this.errorMessage = message[Object.keys(message)[0]];
      } else if (err.status === 404) {
        this.errorMessage = err.error.message;
      }
    }
    );

  }


  ngOnInit() {
  }

}
