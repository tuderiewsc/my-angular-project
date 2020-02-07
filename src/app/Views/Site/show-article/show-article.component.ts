import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../../Models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Controllers/services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrls: ['./show-article.component.css']
})
export class ShowArticleComponent implements OnInit {


  // @Input() passedArticle: ArticleModel;
  passedArticle: ArticleModel;
  //updateArticle: ArticleModel;
  errorMessage: string;
  views: number;
  loaded: boolean = false;


  constructor(private route: ActivatedRoute,
              private router: Router, private api: ApiService) { }


  ngOnInit() {
    this.getArticle();
  }

  getArticle() {
    const id = +this.route.snapshot.params.id;
    const Article = new ArticleModel();

    this.api.getArticle(id).
    subscribe(article => {
      this.passedArticle = article,
        this.views = article.views + 1,
        Article.views = this.views,
        this.api.updateArticle(Article,id).subscribe(res => {
          console.log(res),
            this.loaded = true;
          if(this.loaded){
            this.runJquery();
          }
        })
    });

  }

  runJquery(){
    $(document).ready(function () {

      // $('a.fav').click(function (event) {
      //   event.preventDefault();
      //   var icon = $(this).find('i').text();
      //   if (icon == 'favorite_border') {
      //     $(this).find('i').text('favorite').addClass('wow heartBeat')
      //       .css('color', '#E040FB');
      //   } else {
      //     $(this).find('i').text('favorite_border').removeClass('wow heartBeat')
      //       .css('color', '#757575');
      //   }
      // });

      // Custom tooltip //
      $('.article_text').on('mouseup',function (e) {
        console.log('1');

        var selection = window.getSelection().toString();
        $('p#selTxt').val(selection.toString());
        var x = e.pageX;
        var y = e.pageY;
        placeTooltip(x, y);
        $('#tooltip').show();
      });
      $('a.dismiss').on('click', function (event) {
        $('div#tooltip').css('display', 'none');
      });
      $('a.ccopy').click(function (event) {
        event.preventDefault();
        var $temp = $('<input>');
        $('body').append($temp);
        $temp.val($('p#selTxt').val()).select();
        document.execCommand('copy');
        $temp.remove();
        $('div#tooltip').css('display', 'none');
        alert('متن کپي شد!');
      });
      $('a.cshare').click(function (event) {
        $(this).attr('href', 'http://www.facebook.com/share.phpv=4&src=' + $('p#selTxt').val());
        $('div#tooltip').css('display', 'none');
      });
      function placeTooltip(x_pos, y_pos) {
        $('#tooltip').css({
          top: y_pos - 70 + 'px',
          left: x_pos - 60 + 'px',
          position: 'absolute'
        });
      };
    });
  }


}
