export default class Attack extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string) {
        super(scene, x, y, texture, frame);
        this.name = texture;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //@ts-ignore
        this.body.setAllowGravity(false);
        this.setImmovable(true);
    }

    update(...args: any[]): void {
        super.update(...args);
    }

    attack() {
        this.play('attack').on('animationcomplete', () => this.destroy());
    }
}
