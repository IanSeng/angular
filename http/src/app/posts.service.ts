import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http
            .post<{ name: string }>(
                'https://http-learn-5279a.firebaseio.com/posts.json',
                postData
            )
            .subscribe(responseData => {
                console.log(responseData);
            });
    }

    fetchPosts() {
        return this.http
            .get<{ [key: string]: Post }>(
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
    }
}