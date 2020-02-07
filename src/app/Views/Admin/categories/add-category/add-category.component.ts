import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../../../Models/category.model';
import {ApiService} from '../../../../Controllers/services/api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArticleModel} from '../../../../Models/article.model';
import {Router} from '@angular/router';
import {SnackbarComponent} from '../../../dialog/snackbar/snackbar.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  cats: CategoryModel[];

  errorMessage: string;



  constructor(private api:ApiService, private formbuilder: FormBuilder,
              private router:Router, private snackbar:MatSnackBar) { }

  name= new FormControl('', Validators.required);
  parentId= new FormControl('', Validators.required);

  addCatForm: FormGroup= this.formbuilder.group({
    name:this.name,
    parent_id:this.parentId
  });


  add_category(value: any) {
    this.api.addCategory(value).subscribe(()=>{
      this.router.navigate(["dashboard/category/list"]),
        this.openSnackbar()
    });

  }

  openSnackbar(){
    localStorage.removeItem('snack');
    localStorage.setItem('snack', 'add_category');
    this.snackbar.openFromComponent(SnackbarComponent,{
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      politeness: 'assertive',
      announcementMessage: 'دسته بندی ایجاد شد.'
    });
  }




  ngOnInit() {
    this.api.getHeadCategories().subscribe(res => {this.cats = res;} );
  }



}
