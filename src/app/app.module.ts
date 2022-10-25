import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {ApiService} from "./services/api.service";
import {HttpClientModule} from "@angular/common/http";
import {LoadingComponent} from "./parts/loading/loading.component";
import {LoadingService} from "./services/loading.service";
import { PostComponent } from './pages/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoadingComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule

  ],
  providers: [ApiService, LoadingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
