import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AuthService } from './Controllers/services/auth.service';
import { AutoLogoutServiceService } from './Controllers/services/auto-logout-service.service';
import { MatDialog } from '@angular/material';
import { PagerService } from './Controllers/services/pager.services';
import { ApiService } from './Controllers/services/api.service';
import { CategoryModel } from './Models/category.model';
import {Event} from '@angular/router';
import {Title , Meta} from '@angular/platform-browser';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private metaService: Meta) {
  }


  ngOnInit() {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {

        var rt = this.getChild(this.activatedRoute)

        rt.data.subscribe(data => {
          console.log(data);
          this.titleService.setTitle(data.title)

          if (data.descrption) {
            this.metaService.updateTag({ name: 'description', content: data.descrption })
          } else {
            this.metaService.removeTag("name='description'")
          }

          if (data.robots) {
            this.metaService.updateTag({ name: 'robots', content: data.robots })
          } else {
            this.metaService.updateTag({ name: 'robots', content: "follow,index" })
          }

          if (data.ogUrl) {
            this.metaService.updateTag({ property: 'og:url', content: data.ogUrl })
          } else {
            this.metaService.updateTag({ property: 'og:url', content: this.router.url })
          }

          if (data.ogTitle) {
            this.metaService.updateTag({ property: 'og:title', content: data.ogTitle })
          } else {
            this.metaService.removeTag("property='og:title'")
          }

          if (data.ogDescription) {
            this.metaService.updateTag({ property: 'og:description', content: data.ogDescription })
          } else {
            this.metaService.removeTag("property='og:description'")
          }

          if (data.ogImage) {
            this.metaService.updateTag({ property: 'og:image', content: data.ogImage })
          } else {
            this.metaService.removeTag("property='og:image'")
          }


        })

      })

  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }





}

