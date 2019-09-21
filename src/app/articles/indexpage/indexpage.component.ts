import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-indexpage',
  templateUrl: './indexpage.component.html',
  styleUrls: ['./indexpage.component.css']
})
export class IndexpageComponent implements OnInit {

  categories: CategoryModel[];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCategories()
      .subscribe(res => this.categories = res);
  }

}
