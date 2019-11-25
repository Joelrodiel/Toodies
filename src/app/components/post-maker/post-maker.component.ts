import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DrawingCanvasComponent } from '../drawing-canvas/drawing-canvas.component';

import { Post } from '../../models/post.model';
import { ToodiesService } from '../../services/toodies.service';

@Component({
  selector: 'app-post-maker',
  templateUrl: './post-maker.component.html',
  styleUrls: ['./post-maker.component.css']
})
export class PostMakerComponent implements AfterViewInit {

    @ViewChild(DrawingCanvasComponent, { static: false }) private drawingCanvasComponent: DrawingCanvasComponent;
    postTitle = new FormControl('');
    error = "";

    constructor(private toodiesService: ToodiesService) { }

    ngAfterViewInit() {
    }

    postData() {
        if (this.postTitle.value == '') {
            this.error = "Title is empty!";
            return;
        }

        var imgData = this.drawingCanvasComponent.getCanvasImgData();
        var newPost = new Post(this.postTitle.value, imgData, 0);

        this.toodiesService.newPost(newPost).subscribe(res => { },
            error => {
                console.log(error);
            });
    }

}
