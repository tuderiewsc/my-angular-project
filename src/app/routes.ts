import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ArticlesComponent } from './articles/articles.component';
import { AddArticleComponent } from './articles/add-article/add-article.component';
import { ListArticleComponent } from './articles/list-article/list-article.component';
import { AuthGuard } from './shared/auth.guard';
import { ShowArticleComponent } from './articles/show-article/show-article.component';
import { ArticleResolverService } from './services/article-resolver.service';
import { EditArticleComponent } from './articles/edit-article/edit-article.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



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

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
