import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  loading = false;
  error: string = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe(message => {
      this.error = message;
    });
    this.loading = true;
    this.postsService.fetchPosts().subscribe(post => {
      this.loading = false;
      this.loadedPosts = post;
    })
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.loading = true;
    this.postsService.fetchPosts().subscribe(post => {
      this.loading = false;
      this.loadedPosts = post;
    }, error => {
      this.loading = false;
      this.error = error.error.error;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePost().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }


}
