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
    postsLoaded: boolean;

    constructor(private toodiesService: ToodiesService) { }

    // Uhm make this shit a Promise so we can have faster load times...
    ngOnInit() {
        this.posts = [];
        this.toodiesService.getPosts()
            .subscribe((data: Array<Post>) => {
                for (var i = data.length; i--;) {
                    this.posts.push(new Post(data[i]['_id'], data[i]['title'], data[i]['imgData'], data[i]['likes']));
                }
                this.postsLoaded = true;
            });
    }

    postLiked(id: string) {
        this.toodiesService.likePost(id)
            .subscribe((data: any) => {
                console.log("New likes: " + data['newLikes']);
            });
    }

}
