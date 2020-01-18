import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../../../Models/category.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../../Controllers/services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  category: CategoryModel;
  cats: CategoryModel[];

  errorMessage: string;


  constructor(private router:Router, private route:ActivatedRoute, private api:ApiService,
              private formbuilder: FormBuilder) { }


  name= new FormControl('', Validators.required);
  parent_id= new FormControl('', Validators.required);

  updateCatForm: FormGroup= this.formbuilder.group({
    name:this.name,
    parent_id: this.parent_id
  });

  update_category(value: any, id:number){
    this.api.updateCategory(value, id).subscribe(()=>{
      this.router.navigate(['/dashboard/category/list'])
    })
  };


  ngOnInit() {
    const id = + this.route.snapshot.params.id;

    this.api.getSingleCategory(id).subscribe(cat=> {
      this.category =cat
    });

    this.api.getHeadCategories().subscribe(res => {this.cats = res;} );

  }


}
