export default class Reward extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.name = texture;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //@ts-ignore
        this.body.setAllowGravity(false);
        this.setImmovable(true);

        this.anims.create({
            key: 'reward',
            frames: scene.anims.generateFrameNames('reward', {
                prefix: 'reward',
                start: 1,
                end: 6,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });

        this.setOrigin(0, 1);
        this.play('reward');
    }

    update(...args: any[]): void {
        super.update(...args);
    }
}
