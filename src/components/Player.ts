export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, texture: string, frame: string) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5, 1);
        this.setDisplayOrigin(0, 1);
        this.setCollideWorldBounds(true);

        this.anims.create({
            key: 'stand',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'stand',
                start: 1,
                end: 5,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
         });
        this.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'walk',
                start: 1,
                end: 6,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });
    }
    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        if (cursors.left.isDown) {
            this.setVelocityX(-400);
            this.setFlipX(true);
            //@ts-ignore
            if (this.body.blocked.down) this.play('walk', true);
        } else if (cursors.right.isDown) {
            this.setVelocityX(400);
            this.setFlipX(false);
            //@ts-ignore
            if (this.body.blocked.down) this.play('walk', true);
        } else {
            this.setVelocityX(0);
            //@ts-ignore
            if (this.body.blocked.down) this.play('stand', true);
        }
        //@ts-ignore
        if (cursors.space.isDown && this.body.blocked.down) {
            this.play('jumpstart', true);
            this.setVelocityY(-1250);
        }
    }
}
