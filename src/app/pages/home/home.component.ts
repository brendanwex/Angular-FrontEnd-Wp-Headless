import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {ApiService} from "../../services/api.service";
import {Meta, Title} from "@angular/platform-browser";
import {LoadingService} from "../../services/loading.service";
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: any = [];

  constructor(private meta: Meta, private title: Title, private api: ApiService, public loading: LoadingService, private route: ActivatedRoute, private router: Router,) {
    this.getHomePosts();

  }

  ngOnInit(): void {

  }


  getHomePosts() {


    this.loading.setLoading(true)

    this.api.get('wp/v2/posts?_embed', {}).subscribe((res: any) => {


      this.posts = res;


      this.posts.forEach((obj: {
        featured_media_url: string;
        _embedded: any; }) => {

        if(obj._embedded['wp:featuredmedia'] !== undefined){
          obj.featured_media_url = obj._embedded['wp:featuredmedia']['0'].source_url;

        }else{
          obj.featured_media_url = '';
        }
      });


      console.log(this.posts);


      this.loading.setLoading(false)

    });


  }


  getFeaturedMedia(id: any) :any{
    this.api.get('wp/v2/media/'+id, {}).subscribe((res: any) => {


      return res.source_url;

    });


  }


  goToPost(slug: any) {
    this.router.navigate(['post', slug]);

  }

}
