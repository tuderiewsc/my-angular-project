import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../../../Models/category.model';
import {ApiService} from '../../../../Controllers/services/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: CategoryModel[];
  keyword: string;


  constructor(private api:ApiService, private router:Router) { }

  ngOnInit() {

    this.getCategories();
    this.keyword='';
  }

  getCategories(){
    this.api.getCategories().subscribe(cats=> this.categories=cats);

  }

  delCat(id:number){
    if (confirm("Are u Sure?")){
      this.api.deleteCategory(id).subscribe(()=> {
        alert("deleted"),
          this.getCategories()
          //this.router.navigate()
      });
    }
  }


}
