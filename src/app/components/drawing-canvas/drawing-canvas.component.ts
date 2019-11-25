import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-drawing-canvas',
  templateUrl: './drawing-canvas.component.html',
  styleUrls: ['./drawing-canvas.component.css']
})
export class DrawingCanvasComponent implements OnInit {

    @ViewChild("gameCanvas", {static: true}) private gameCanvas: ElementRef;
    private canvas: HTMLCanvasElement;
    private context: any;
    private drawSub: Subscription;
    private points: any;
    private mouseHasMoved: boolean;
    private valuesChanged: boolean;
    private isPressing: boolean;
    private prev: any;
    private currentPos: any;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.canvas = this.gameCanvas.nativeElement;
        this.context = this.gameCanvas.nativeElement.getContext("2d");

        this.context.lineWidth = 3;
        this.context.lineCap = 'round';
        this.context.strokeStyle = '#000';

        this.points = [];

        this.mouseHasMoved = true;
        this.valuesChanged = true;
        this.isPressing = false;

        this.bindEvents();
    }

    getCanvasImgData() {
        console.log("GOT ME!");
        return this.canvas.toDataURL();
    }

    bindEvents() {
        this.canvas.addEventListener('mousedown', this.handlePointerDown.bind(this));
        this.canvas.addEventListener('mouseup', this.handlePointerUp.bind(this));
        this.canvas.addEventListener('mousemove', this.handlePointerMove.bind(this));
    }

    handlePointerDown(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        this.prev = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        if (!this.isPressing) {
            this.drawCanvas(this.prev, this.prev);
        }

        this.isPressing = true;

    }

    handlePointerUp(e) {
        e.preventDefault();
        this.isPressing = false;
    }

    handlePointerMove(e) {
        const rect = this.canvas.getBoundingClientRect();

        this.currentPos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        if (this.isPressing) {
            this.drawCanvas(this.prev, this.currentPos);
        }
        
        this.prev = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

    }

    drawCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
        if (!this.context) {
            return;
        }

        this.context.beginPath();

        if (prevPos) {
            this.context.moveTo(prevPos.x, prevPos.y);
            this.context.lineTo(currentPos.x, currentPos.y);
            this.context.stroke();
        }
    }
}
