export default class RedPotion extends Phaser.Physics.Arcade.Image {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.name = texture;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //@ts-ignore
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.setX(x).setY(y).setScale(1.5);
        this.setOrigin(0, 1);
    }

    update(...args: any[]): void {
        super.update(...args);
    }
}
