export class Post {
    title: string;
    imgData: string;
    likes: number;

    constructor(t: string, img: string, likes: number) {
        this.title = t;
        this.imgData = img;
        this.likes = likes;
    }

    [Symbol.iterator] = function* () {
        let keys = Object.keys(this);
        for (let i of keys) {
            yield this[i];
        }
    }
}
