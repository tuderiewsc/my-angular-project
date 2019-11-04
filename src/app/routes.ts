import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ArticlesComponent } from './articles/articles.component';
import { AddArticleComponent } from './articles/add-article/add-article.component';
import { ListArticleComponent } from './articles/list-article/list-article.component';
import { AuthGuard } from './shared/auth.guard';
import { ShowArticleComponent } from './articles/show-article/show-article.component';
import { EditArticleComponent } from './articles/edit-article/edit-article.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { IndexpageComponent } from './articles/indexpage/indexpage.component';
import { CategoryComponent } from './articles/category/category.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { PanelComponent } from './userpanel/panel/panel.component';
import { GuestGuard } from './shared/guest.guard';
import { SearchPageComponent } from './pages/search-page/search-page.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: IndexpageComponent },
  {
    path: 'article/add', component: AddArticleComponent, canActivate: [AuthGuard]
  },
  {
    path: 'articlelist', component: ListArticleComponent, canActivate: [AuthGuard],
  },
  {
    path: 'articles/page/:id', component: ArticlesComponent
  },
  {
    path: 'article/:id', component: ShowArticleComponent
  },
  {
    path: 'article/:id/edit', component: EditArticleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category/:id/page/:pagenum', component: CategoryComponent
  },
  {
    path: 'search/:query', component: SearchPageComponent
  },
  {
    path: 'register', component: RegisterComponent, canActivate: [GuestGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [GuestGuard]
  },
  {
    path: 'user-panel', component: PanelComponent, canActivate: [AuthGuard]
  },

  // Last Path
  { path: '**', component: PageNotFoundComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
