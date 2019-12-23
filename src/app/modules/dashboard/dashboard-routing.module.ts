import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddArticleComponent} from '../../Views/Admin/articles/add-article/add-article.component';
import {AuthGuard} from '../../Controllers/middleware/auth.guard';
import {ListArticleComponent} from 'src/app/Views/Admin/articles/list-article/list-article.component';
import {EditArticleComponent} from 'src/app/Views/Admin/articles/edit-article/edit-article.component';
import {ArticleComponent} from '../../Dashboard/dashboard/articles/article.component';
import {DashboardComponent} from '../../dashboard.component';

// const dashroutes: Routes = [
//   {
//     path: 'dashboard',
//     component:DashboardComponent, canActivate:[AuthGuard],
//     children:[
//       {
//         path: 'articles', component:ArticleComponent,
//         children:[
//           {
//             path: 'list', component: ListArticleComponent
//           },
//           {
//             path: 'add', component: AddArticleComponent
//           },
//           {
//             path: ':id/edit', component: EditArticleComponent
//           }
//         ]
//       }
//     ]
//   }
// ];

@NgModule({
  //imports: [RouterModule.forChild(dashroutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
