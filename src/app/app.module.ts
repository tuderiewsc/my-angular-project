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
import { ShowArticleComponent } from './articles/show-article/show-article.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './shared/auth.guard';
import { ArticlesService } from './services/articles.service';
import { EditArticleComponent } from './articles/edit-article/edit-article.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ListArticleComponent } from './articles/list-article/list-article.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';
import { SearchPipe } from './pipes/search.pipe';
import { CompletePipe } from './pipes/complete.pipe';
import { routing } from './routes';
import { FavoriteDirective } from './Directives/favorite.directive';
import { ApiService } from './services/api.service';
import { articleStatsToken, stats } from './providers/article.provider';
import { PagerService } from './services/pager.services';
import { PaginationComponent } from './articles/pagination/pagination.component';
import { IndexpageComponent } from './articles/indexpage/indexpage.component';


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
    IndexpageComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routing,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule,
    MatSlideToggleModule, MatInputModule, MatFormFieldModule, MatSelectModule,
    MatTableModule, MatSnackBarModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  providers: [AuthGuard, ArticlesService, ApiService, PagerService,
    { provide: articleStatsToken, useValue: stats }
  ],
  bootstrap: [AppComponent],
  entryComponents: [SnackbarComponent]
})
export class AppModule { }
