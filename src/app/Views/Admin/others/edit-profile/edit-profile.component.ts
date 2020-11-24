import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateService} from '../../../../Controllers/services/validate.service';
import {AuthService} from '../../../../Controllers/services/auth.service';
import {Router} from '@angular/router';
import {ApiService} from '../../../../Controllers/services/api.service';
import {SnackbarComponent} from '../../../dialog/snackbar/snackbar.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ImglistComponent} from '../../../dialog/imglist/imglist.component';
import * as $ from 'jquery';
import {timeout} from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  errorMessage: string;
  userId: number;
  userName: string;
  userGender: string;
  userProfilePic: string;
  user: string;
  loaded: boolean=false;


  constructor(private formbuilder: FormBuilder, private validateservice: ValidateService
    , private auth: AuthService, private router: Router, private api:ApiService,
              private snackbar:MatSnackBar, public dialog:MatDialog) {

    this.userId = JSON.parse(localStorage.getItem("user")).id;
    this.api.getUser(this.userId).subscribe(user=>{
      this.userName = user.name,
      this.userGender = user.gender,
      this.userProfilePic = user.profilepic,
        this.loaded=true
    });
  }


  name = new FormControl('', [Validators.required]);
  profilepic = new FormControl('');
  gender = new FormControl('', [Validators.required]);
  user_id = new FormControl('');

  edit_profile_form: FormGroup = this.formbuilder.group({
    name: this.name,
    profilepic: this.profilepic,
    gender: this.gender,
    user_id: this.user_id
  })



  ngOnInit() {
  }

  ep(value: any, id:number){
    console.log(value['profilepic']);
    if (localStorage.getItem('imageSrc') !== null){
      value['profilepic'] = 'http://demoapps.ir/demo/api_articles/article/public/upload/image/'+localStorage.getItem('imageSrc');
    }
    this.api.updateUser(value, id).subscribe(res => {
      if(res['result'] == "update success"){
        this.router.navigateByUrl('dashboard');
        this.openSnackbar();
        setTimeout(function() {
          location.reload();
        }, 2000)
      }
    });
  }

  openSnackbar() {
    localStorage.removeItem('snack');
    localStorage.setItem('snack', 'ep_success');
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: 'LoginSuccess'
    });
  }

  removeImageSrc(){
    localStorage.removeItem('imageSrc');
  }

  openDialog(){
    localStorage.setItem('imgSection', 'profile');
    this.dialog.open(ImglistComponent, {
      width: '720px'
    });
  }

}
