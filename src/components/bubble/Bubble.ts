export default class Bubble extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'bubble');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.setImmovable(true);

        this.anims.create({
            key: 'play',
            frames: scene.anims.generateFrameNames('bubble', {
                prefix: 'play',
                start: 1,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 10,
            repeat: -1
        });

        this.setX(x).setY(y);
        this.play('play');
    }
}
