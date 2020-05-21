import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ToodiesService {

    endpoint = environment.apiUrl;
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

    getPosts(skip: Number = 0, lim: Number = 0) {
        
        var query = "drawings?skip=" + skip;

        if (lim > 0) {
            query += "&limit=" + lim;
        }

        return this.http.get(this.endpoint + query);
    }

    likePost(id: string) {

        var query = "likeDrawing/" + id;

        return this.http.get(this.endpoint + query);
    }
}
