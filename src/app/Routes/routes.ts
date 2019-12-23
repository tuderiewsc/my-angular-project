import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ArticlesComponent } from '../Views/Site/articles.component';
import { AddArticleComponent } from '../Views/Admin/articles/add-article/add-article.component';
import { ListArticleComponent } from '../Views/Admin/articles/list-article/list-article.component';
import { AuthGuard } from '../Controllers/middleware/auth.guard';
import { ShowArticleComponent } from '../Views/Site/show-article/show-article.component';
import { EditArticleComponent } from '../Views/Admin/articles/edit-article/edit-article.component';
import { PageNotFoundComponent } from '../Views/Site/page-not-found/page-not-found.component';
import { IndexpageComponent } from '../Views/Site/indexpage/indexpage.component';
import { CategoryComponent } from '../Views/Site/category/category.component';
import { RegisterComponent } from '../Views/Auth/register/register.component';
import { LoginComponent } from '../Views/Auth/login/login.component';
import { GuestGuard } from '../Controllers/middleware/guest.guard';
import { SearchPageComponent } from '../Views/Site/search-page/search-page.component';
import {AppComponent} from '../app.component';
import {DashboardComponent} from '../dashboard.component';
import {SiteLayoutComponent} from '../Views/layouts/site-layout/site-layout.component';
import {DashboardLayoutComponent} from '../Views/layouts/dashboard-layout/dashboard-layout.component';


const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent,
    children:[
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: IndexpageComponent},
      {
        path: 'articles/page/:id', component: ArticlesComponent
      },
      {
        path: 'article/:id', component: ShowArticleComponent
      },
      {
        path: 'category/:id/page/:pagenum', component: CategoryComponent
      },
      {
        path: 'search/:query', component: SearchPageComponent
      },
      {
        path: 'register', component: RegisterComponent,
        canActivate: [GuestGuard]
      },
      {
        path: 'login', component: LoginComponent,
        canActivate: [GuestGuard]
      },
    ]
  },
  {
    path: '', component: DashboardLayoutComponent,
    children:[
      {path: 'dashboard', redirectTo: 'dashboard/article/list', pathMatch: 'full'},
      {
        path: 'dashboard/article/add', component: AddArticleComponent, canActivate: [AuthGuard]
      },
      {
        path: 'dashboard/article/list', component: ListArticleComponent, canActivate: [AuthGuard],
      },
      {
        path: 'dashboard/article/:id/edit', component: EditArticleComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  // Last Path
  { path: '**', component: PageNotFoundComponent },

];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  enableTracing: true,
  preloadingStrategy: PreloadAllModules
});
