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


  constructor() { }

  ngOnInit() {
  }

}
