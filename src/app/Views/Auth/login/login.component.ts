import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Controllers/services/auth.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidateService } from 'src/app/Controllers/services/validate.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as cryptojS from 'crypto-js';
import {SnackbarComponent} from '../../dialog/snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';
import {userError} from '@angular/compiler-cli/src/transformers/util';
import {Constants} from '../../../Constants';
import {ApiService} from '../../../Controllers/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  userID: string;



  constructor(private formbuilder: FormBuilder, private validateservice: ValidateService
    , private auth: AuthService, private router: Router, private snackbar: MatSnackBar
    ,private cookieservice:CookieService , private api:ApiService) { }

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

  ngOnInit() {
    $(document).ready(function () {

      $('#login_submit').click(function() {
        $('#login_refresh').css('opacity', '1');

        setInterval(function() {
          $('#login_refresh').css('opacity', '0');
        }, 3000)

      })

    });

  }

  login(value: any) {

    this.auth.login(value).subscribe(token => {
        if (token){
          this.cookieservice.set(Constants.AuthCookie , token.ciphertext);
          Constants.UserID = this.CryptoJSAesDecrypt('your passphrase', token);
          this.auth.currentUser.next(token);
          this.openSnackbar();
          this.router.navigateByUrl('');
        }
      }, err => {
        if (err.status === 402) {
          const message = err.error.message;
          this.errorMessage = message[Object.keys(message)[0]];
        } else if (err.status === 404) {
          this.errorMessage = err.error.message;
        }
        setTimeout( () =>{
          this.errorMessage = undefined;
        },3000 )
      }
    );
  }


  CryptoJSAesDecrypt(passphrase,encrypted_json_string){
    //var obj_json = JSON.parse(encrypted_json_string);
    var obj_json = encrypted_json_string;
    var encrypted = obj_json.ciphertext;
    var salt = cryptojS.enc.Hex.parse(obj_json.salt);
    var iv = cryptojS.enc.Hex.parse(obj_json.iv);
    var key = cryptojS.PBKDF2(passphrase, salt, { hasher: cryptojS.algo.SHA512, keySize: 64/8, iterations: 999});
    var decrypted = cryptojS.AES.decrypt(encrypted, key, { iv: iv});

    return decrypted.toString(cryptojS.enc.Utf8);
  }

  openSnackbar() {
    localStorage.removeItem('snack');
    localStorage.setItem('snack', 'login_success');
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      direction: 'rtl',
      panelClass: 'LoginSuccess'
    });
  }



}
