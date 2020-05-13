import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
    error = new Subject<string>();
    constructor(private http: HttpClient) { }

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title: title, content: content };
        this.http
            .post<{ name: string }>(
                'https://http-learn-5279a.firebaseio.com/posts.json',
                postData,
                {
                    observe: 'response' // adding this we will get all response object. E.x it will have status code and headers
                }
            )
            .subscribe(responseData => {
                console.log(responseData);
            },
                error => {
                    this.error.next(error.message);
                });
    }

    fetchPosts() {
        // another way of writing param
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');

        return this.http
            .get<{ [key: string]: Post }>(
                'https://http-learn-5279a.firebaseio.com/posts.json',
                {
                    headers: new HttpHeaders({ "Custom-Header": 'hello' }),
                    params: new HttpParams().set('print', 'pretty'),
                    responseType: 'json'
                }).pipe(
                    map((responseData) => {
                        const objectArray: Post[] = [];
                        for (const key in responseData) {
                            if (responseData.hasOwnProperty) {
                                objectArray.push({ ...responseData[key], id: key })
                            }
                        }
                        return objectArray;
                    }),
                    // catchError(errorRes => {
                    //     // Send to analytics server
                    //     throwError(errorRes);
                    // })
                )
    }

    deletePost() {
        return this.http.delete('https://http-learn-5279a.firebaseio.com/posts.json', {
            observe: 'events', // it will return http response object 
            responseType: 'text' // change the respond object to json, blob or anything else
        }).pipe(tap(event => {
            console.log(event);
            if (event.type === HttpEventType.Sent){
                // 
            }
            if (event.type === HttpEventType.Response){
                console.log(event.body)
            } 
        }))
    }
}