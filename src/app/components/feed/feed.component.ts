import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from '../../models/post.model';
import { ToodiesService } from '../../services/toodies.service';

import { Throttle } from '../../decorators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

    posts: Array<Post>;
    postsLoaded: boolean;
    currentPage;
    endOfPosts = false;

    @HostListener('window:scroll', [])
    @Throttle(400)
    onScroll() {
        if (!this.endOfPosts && window.scrollY > (400 * 5) - window.innerHeight) {
            this.loadNextPage();
        }
    }

    constructor(private toodiesService: ToodiesService) { }

    ngOnInit() {
        this.currentPage = 0;
        this.posts = [];
        this.toodiesService.getPosts(this.currentPage)
            .subscribe((data: Array<Post>) => {
                for (let i in data) {
                    this.posts.push(new Post(data[i]['_id'], data[i]['title'], data[i]['imgData'], data[i]['likes']));
                }
                this.postsLoaded = true;
            });
    }

    loadNextPage() {
        this.currentPage += 5;
        
        this.toodiesService.getPosts(this.currentPage)
            .subscribe((data: Array<Post>) => {
                if (data.length == 0) {
                    this.endOfPosts = true;
                }
                for (let i in data) {
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
