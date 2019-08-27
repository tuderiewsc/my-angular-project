import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {
  MatButtonModule,
  MatDatepickerModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatSelectModule, MatSlideToggleModule,
  MatToolbarModule,
  MatTableModule,
  MatSnackBarModule
} from '@angular/material';
import { ArticlesComponent } from './articles/articles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddArticleComponent } from './articles/add-article/add-article.component';
import { ShowArticleComponent } from './articles/show-article/ShowArticleComponent';
import { Routes, Route, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/auth.guard';
import { ArticlesService } from './services/articles.service';
import { EditArticleComponent } from './articles/edit-article/edit-article.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ArticleResolverService } from './services/article-resolver.service';
import { ListArticleComponent } from './articles/list-article/list-article.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: ArticlesComponent },
  { path: 'article/add', component: AddArticleComponent, canActivate: [AuthGuard] },
  { path: 'article/list', component: ListArticleComponent, canActivate: [AuthGuard] },
  {
    path: 'article/:id', component: ShowArticleComponent,
    resolve: { resolveData: ArticleResolverService }
  },
  {
    path: 'article/:id/edit', component: EditArticleComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    AddArticleComponent,
    ShowArticleComponent,
    EditArticleComponent,
    PageNotFoundComponent,
    ListArticleComponent,
    SnackbarComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule,
    MatSlideToggleModule, MatInputModule, MatFormFieldModule, MatSelectModule,
    MatTableModule, MatSnackBarModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  providers: [AuthGuard, ArticlesService],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarComponent]
})
export class AppModule { }
