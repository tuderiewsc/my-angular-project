import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../Controllers/services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {


  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
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

  }


  logout() {
    this.auth.logOut();
    this.router.navigateByUrl('/');
    return false;
  }
}
