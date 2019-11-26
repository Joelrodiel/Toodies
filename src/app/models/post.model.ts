export class Post {
    id: string;
    title: string;
    imgData: string;
    likes: number;

    constructor(id: string, t: string, img: string, likes: number) {
        this.id = id;
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
