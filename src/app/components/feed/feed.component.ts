import { Component, OnInit } from '@angular/core';

import { Post } from '../../models/post.model';
import { ToodiesService } from '../../services/toodies.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

    posts: Array<Post>;
    showPost: Post;

    constructor(private toodiesService: ToodiesService) { }

    ngOnInit() {
        this.posts = [];
        this.toodiesService.getPosts()
            .subscribe((data: Post) => {
                for (let post of data) {
                    this.posts.push(new Post(post['title'], post['imgData'], post['likes']));
                }
            });
    }

}
