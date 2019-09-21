import { Component, OnInit, Input } from '@angular/core';
import { Paginate } from 'src/app/models/paginate';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pager: Paginate;

  constructor() { }

  ngOnInit() {
  }

}
