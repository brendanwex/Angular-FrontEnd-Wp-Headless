import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {ApiService} from "../../services/api.service";
import {LoadingService} from "../../services/loading.service";
import {environment} from "../../../environments/environment";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {


  slug: any;
  post : any = {'title' : '', 'content' : ''};

  constructor(  private route: ActivatedRoute, public api: ApiService, public loading: LoadingService, private meta: Meta, private title: Title) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      this.slug = params.get('slug');


      this.loading.setLoading(true)

      this.api.get('wp/v2/posts/?slug='+this.slug+'&_embed', {}).subscribe((res : any)=>{


        this.post = res[0];


        if(environment.hasYoast){
          this.title.setTitle(this.post.yoast_head_json.title)
          this.meta.addTag({ name: 'description', content: this.post.yoast_head_json.description });

        }else{
          this.title.setTitle(this.post.title.rendered)
        }


        this.loading.setLoading(false)

      });

    });


  }

}
