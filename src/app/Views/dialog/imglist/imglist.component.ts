import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/Controllers/services/api.service';

@Component({
  selector: 'app-imglist',
  templateUrl: './imglist.component.html',
  styleUrls: ['./imglist.component.css']
})
export class ImglistComponent implements OnInit {

  images: Array<any>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getImgList().subscribe(res => this.images = res);
  }

  getImageSrc(src:string){
    localStorage.removeItem('imageSrc');
    localStorage.setItem('imageSrc', src);
  }

}
