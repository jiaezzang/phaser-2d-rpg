import HealthBar from './healthBar/HealthBar';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    [x: string]: any;
    attacked = false;
    dead = false;
    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, texture: string, frame: string) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0, 1);
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
        this.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'attack',
                start: 1,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: 1
        });
        this.anims.create({
            key: 'jumpstart',
            frames: scene.anims.generateFrameNames('player', {
                prefix: 'jumpstart',
                start: 1,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: 2
        });
    }
    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        // if(this.dead) return;

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
            // this.play('stand');
            //@ts-ignore
        }
        //@ts-ignore
        if (cursors.space.isDown && this.body.blocked.down) {
            this.jump();
            this.setVelocityY(-1250);
        }
    }
    jump() {
        this.play('jumpstart', true).on('animationcomplete', () => this.play('stand'));
    }
    attack() {
        this.play('attack');
    }
    kill(hp: number) {
        if (this.dead) return;
        if (hp === 0) {
            this.dead = true;
            this.setTint();
            this.setFrame('hit1');
            // .setRotation(30);
            this.setFlipX(false);
        }
        this.attacked = true;
        this.setTint(0xff0000);
        setTimeout(() => {
            this.setTint();
            this.attacked = false;
        }, 1000);

        this.setFrame('hit1');
    }
}
