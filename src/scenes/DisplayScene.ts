export default class DisplayScene extends Phaser.Scene {
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
        console.log('create! s');
    }
    update(time: number, delta: number): void {
        console.log('update s');
    }
}