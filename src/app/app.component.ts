import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AuthService } from './Controllers/services/auth.service';
import { AutoLogoutServiceService } from './Controllers/services/auto-logout-service.service';
import { MatDialog } from '@angular/material';
import { PagerService } from './Controllers/services/pager.services';
import { ApiService } from './Controllers/services/api.service';
import { CategoryModel } from './Models/category.model';
import {Event} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {


  constructor(private router:Router) {

  }



  ngOnInit(): void {
  }



}

