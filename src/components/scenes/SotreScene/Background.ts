export class Background extends Phaser.GameObjects.Group {
    constructor(public scene: Phaser.Scene) {
        super(scene);
        const x = this.scene.cameras.main.centerX;
        const y = this.scene.cameras.main.centerY;

        scene.add.image(x, y, 'bg2').setScale(3, 2);
    }
}
