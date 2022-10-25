import { Component } from '@angular/core';
import {Meta, Title} from "@angular/platform-browser";
import {environment} from "../environments/environment";
import {ApiService} from "./services/api.service";
import {LoadingService} from "./services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  appName:string = '';

  constructor(private meta: Meta, private title: Title, private api: ApiService, public loading: LoadingService) {


    this.getHome();


  }


  getHome(){

    this.loading.setLoading(true)

    this.api.get('wp/v2/pages/'+environment.homePage, {}).subscribe((res : any)=>{


      if(environment.hasYoast){
        this.title.setTitle(res.yoast_head_json.title)
        this.meta.addTag({ name: 'description', content: res.yoast_head_json.description });

      }else{
        this.title.setTitle(res.title.rendered)
      }

      this.appName = environment.appName
      this.meta.addTag({name: 'theme-color', content: environment.themeColor})

      this.loading.setLoading(false)

    });



  }

}
