import { Component, OnInit, StaticProvider } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  openFromComponent(SnackbarComponent, arg1: { duration: number; verticalPosition: string; horizontalPosition: string; politeness: string; announcementMessage:string }) {
    throw new Error('Method not implemented.');
  }

  snackType: string;


  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('snack') == 'add_article'){
      this.snackType = 'add_article';
    } else if(localStorage.getItem('snack') == 'login_success'){
      this.snackType = 'login_success';
    }else if(localStorage.getItem('snack') == 'ep_success'){
      this.snackType = 'ep_success';
    }
  }

}
