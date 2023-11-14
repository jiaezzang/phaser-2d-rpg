export class Background extends Phaser.Physics.Arcade.Image {
    constructor(public scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        const xValue = this.scene.cameras.main.centerX;
        const yValue = window.innerHeight;

        scene.add.image(xValue, yValue, 'bg2').setOrigin(0.5, 1);
    }
}
