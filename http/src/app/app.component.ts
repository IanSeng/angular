import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import { Post } from './post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  loading = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.onFetchData();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://http-learn-5279a.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.onFetchData();
  }

  onClearPosts() {
    // Send Http request
  }

  // Get call to retrive data
  private onFetchData() {
    this.loading = true;
    this.http
      .get<{[key: string]:Post}>(
        'https://http-learn-5279a.firebaseio.com/posts.json').pipe(
          map((responseData) => {
            const objectArray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty) {
                objectArray.push({ ...responseData[key], id: key })
              }
            }
            return objectArray;
          })
        )
      .subscribe(post => {
        this.loadedPosts = post;
        this.loading = false;
      })
  }
}
