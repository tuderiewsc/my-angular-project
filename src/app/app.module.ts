import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatSelectModule, MatSlideToggleModule,
  MatToolbarModule,
  MatTableModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';
import { ArticlesComponent } from './Views/Site/articles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddArticleComponent } from './Views/Admin/articles/add-article/add-article.component';
import { ShowArticleComponent } from './Views/Site/show-article/show-article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './Controllers/middleware/auth.guard';
import { EditArticleComponent } from './Views/Admin/articles/edit-article/edit-article.component';
import { PageNotFoundComponent } from './Views/Site/page-not-found/page-not-found.component';
import { ListArticleComponent } from './Views/Admin/articles/list-article/list-article.component';
import { SnackbarComponent } from './Views/dialog/snackbar/snackbar.component';
import { SearchPipe } from './Controllers/pipes/search.pipe';
import { CompletePipe } from './Controllers/pipes/complete.pipe';
import { routing } from './Routes/routes';
import { FavoriteDirective } from './Controllers/Directives/favorite.directive';
import { ApiService } from './Controllers/services/api.service';
import { articleStatsToken, stats } from './Controllers/providers/article.provider';
import { PagerService } from './Controllers/services/pager.services';
import { PaginationComponent } from './Views/Site/pagination/pagination.component';
import { IndexpageComponent } from './Views/Site/indexpage/indexpage.component';
import { CategoryComponent } from './Views/Site/category/category.component';
import { RegisterComponent } from './Views/Auth/register/register.component';
import { LoginComponent } from './Views/Auth/login/login.component';
import { GuestGuard } from './Controllers/middleware/guest.guard';
import { SearchPageComponent } from './Views/Site/search-page/search-page.component';
import { DeleteDialogComponent } from './Views/dialog/delete-dialog/delete-dialog.component';
import { ImglistComponent } from './Views/dialog/imglist/imglist.component';
import { DashboardComponent } from './dashboard.component';
import { SiteLayoutComponent } from './Views/layouts/site-layout/site-layout.component';
import { DashboardLayoutComponent } from './Views/layouts/dashboard-layout/dashboard-layout.component';
import { AddCategoryComponent } from './Views/Admin/categories/add-category/add-category.component';
import { ListCategoryComponent } from './Views/Admin/categories/list-category/list-category.component';
import { EditCategoryComponent } from './Views/Admin/categories/edit-category/edit-category.component';
import { EditProfileComponent } from './Views/Admin/others/edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    AddArticleComponent,
    ShowArticleComponent,
    EditArticleComponent,
    PageNotFoundComponent,
    ListArticleComponent,
    SnackbarComponent,
    SearchPipe,
    CompletePipe,
    FavoriteDirective,
    PaginationComponent,
    IndexpageComponent,
    CategoryComponent,
    RegisterComponent,
    LoginComponent,
    SearchPageComponent,
    DeleteDialogComponent,
    ImglistComponent,
    DashboardComponent,
    SiteLayoutComponent,
    DashboardLayoutComponent,
    AddCategoryComponent,
    ListCategoryComponent,
    EditCategoryComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routing,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule,
    MatSlideToggleModule, MatInputModule, MatFormFieldModule, MatSelectModule,
    MatTableModule, MatSnackBarModule, MatDialogModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })
  ],
  providers: [AuthGuard, ApiService, PagerService, GuestGuard,
    { provide: articleStatsToken, useValue: stats }
  ],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarComponent, DeleteDialogComponent, ImglistComponent]
})
export class AppModule { }
