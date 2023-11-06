import { Background } from '../Background';

export default class DisplayScene extends Phaser.Scene {
    background!: Background;
    constructor() {
        super({ key: 'display' });
        console.log('cons! s');
    }
    init() {
        console.log('init s');
    }
    preload() {
        console.log('preload s');
    }
    create() {
        this.background = new Background(this);
        console.log('create! s');
    }
    update(time: number, delta: number): void {
        console.log('update s');
        this.background.update();
    }
}
