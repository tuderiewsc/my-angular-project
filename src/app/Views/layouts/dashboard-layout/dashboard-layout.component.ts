import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../Controllers/services/auth.service';
import * as $ from 'jquery';
import {AutoLogoutServiceService} from '../../../Controllers/services/auto-logout-service.service';
import {ApiService} from '../../../Controllers/services/api.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  timeLeft: number;
  timeLeft_minute: number;
  timeLeft_seconds: number;
  math = Math;

  userId:number;
  userName: string;
  userEmail: string;
  avatar:string;
  avatarSrc:string;


  constructor(private router: Router, private auth: AuthService, private api:ApiService,
              private logoutService : AutoLogoutServiceService) {}


  ngOnInit() {
    console.log('avatarSrc: '+ this.avatarSrc);

    $(document).ready(function () {
      $('input#check').change(function(event) {
        var state = $(this).prop('checked');
        if (state == true) {
          $('nav.navigation').animate({right: '0'}, 'fast');
          $('ul.menu').removeClass('hidden').animate({width:'100%'}, 'fast');
          $('section.panel_content').css({
            'margin-right': '22%',
            'width': '76%'
          });
        }else{
          $('nav.navigation').animate({right: '-20%'}, 'fast');
          $('ul.submenu').addClass('hidden').css('height', '0');
          $('section.panel_content').css({
            'margin-right': '0',
            'width': '100%'
          });
        }
      });
    });

    this.userId = JSON.parse(localStorage.getItem("user")).id;

    this.api.getUser(this.userId).subscribe(user => {
      this.avatar = user['profilepic'];
      //this.avatar = user['profilepic'];
      console.log('avatar: ' + this.avatar);

      if (this.avatar != null){
        this.avatarSrc = this.avatar;
      } else {
        if(user['gender'] == 'male'){
          this.avatarSrc = 'assets/Avatar/male-avatar.png';
        }else{
          this.avatarSrc = 'assets/Avatar/female-avatar.png';
        }
      }
      this.userName = user['name'];
      this.userEmail = user['email'];

    });



    setInterval(() => {
      this.timeLeft = this.logoutService.timeRemained().df;
      this.timeLeft_minute = this.math.floor(this.timeLeft/60000);
      var floats = this.timeLeft/60000
      var decimals = floats - this.timeLeft_minute;
      this.timeLeft_seconds = this.math.floor(decimals*60);
    }, 1000);

  }


  logout() {
    this.auth.logOut();
    this.router.navigateByUrl('/');
    return false;
  }
}
