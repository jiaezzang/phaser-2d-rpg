export class Background extends Phaser.GameObjects.Group {
    bg1: Phaser.GameObjects.TileSprite;

    constructor(public scene: Phaser.Scene) {
        super(scene);
        const { width, height } = scene.game.canvas;
        const x = this.scene.cameras.main.centerX;
        const y = this.scene.cameras.main.height;

        this.bg1 = scene.add.tileSprite(0, 0, width, height, 'bg1').setScrollFactor(0).setOrigin(0, 0);

        this.addMultiple([this.bg1]);
    }
    update() {
        this.bg1.tilePositionX = this.scene.cameras.main.worldView.x * 0.2;
    }
}
