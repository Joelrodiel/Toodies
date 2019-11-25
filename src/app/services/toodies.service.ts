import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ToodiesService {

    endpoint = "http://192.168.56.1:3000/drawings";
    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    newPost(p: Post): Observable<any> {
        return this.http.post<any>(this.endpoint, p, this.httpOptions)
        .pipe(map(post => {
            return post;
        }));
    }

    getPosts() {
        return this.http.get(this.endpoint);
    }
}
