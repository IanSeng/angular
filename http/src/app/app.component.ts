import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  //loadedPosts: Observable<Post[]>
  loading = false;

  constructor(private http: HttpClient, private postsService: PostsService) { }

  ngOnInit() {
    this.loading = true;
    this.postsService.fetchPosts().subscribe(post => {
      this.loading = false;
      this.loadedPosts= post;
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
      this.loadedPosts= post;
    })
  }

  onClearPosts() {
    // Send Http request
  }

  // Get call to retrive data
  private onFetchData() {
    this.loading = true;
    this.postsService.postGetSubject.subscribe(result => {
      this.loadedPosts = result.post
    })
    this.postsService.fetchPosts();
  }
}
