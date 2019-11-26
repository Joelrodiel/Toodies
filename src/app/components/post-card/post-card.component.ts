import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

    @Input() post: Post;
    @Output() liked = new EventEmitter<string>();
    private postLiked = false;
    heartIconPath = "heart.png";

    constructor() { }

    ngOnInit() {
    }

    likePost() {
        if (!this.postLiked) {
            this.heartIconPath = "heart-filled.png";
            this.liked.emit(this.post.id);
            this.post.likes++;
            this.postLiked = true;
        }
    }

}
