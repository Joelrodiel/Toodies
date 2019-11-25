import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ToodiesService {

    endpoint = "http://toodies-api.herokuapp.com/";
    httpOptions = {
        headers: new HttpHeaders({
            'Content-type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    newPost(p: Post): Observable<any> {

        var query = "drawings";

        return this.http.post<any>(this.endpoint + query, p, this.httpOptions)
        .pipe(map(post => {
            return post;
        }));
    }

    getPosts() {
        
        var query = "drawings";

        return this.http.get(this.endpoint + query);
    }
}
