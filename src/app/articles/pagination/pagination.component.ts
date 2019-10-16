import { Component, OnInit, Input } from '@angular/core';
import { Paginate } from 'src/app/models/paginate';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pager: Paginate;
  @Input() catPager: Paginate;
  id: number;

  constructor(private activateroute: ActivatedRoute) { }

  ngOnInit() {
    this.activateroute.params.forEach((urlParams) => this.id = urlParams['id']);
  }

}
