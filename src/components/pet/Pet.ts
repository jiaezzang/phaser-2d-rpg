import Player from '../Player';

export default class Pet extends Phaser.Physics.Arcade.Sprite {
    [x: string]: any;
    dead = false;
    minDistance: number;
    history: { x: number; y: number }[];
    historyLength: number;
    maxSpeed: number;
    targetMovig = false;
    deadLine = 600;
    midLine = 200;
    minLine = 50;
    isFollowingPlayer = false;
    updateTween!: any;
    constructor(scene: Phaser.Scene, x: number = 0, y: number = 0, texture: string, frame: string, target: Player) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(true);
        this.setOrigin(0, 1);
        this.setDisplayOrigin(0, 1);
        this.setSize(30, 50);
        this.setCollideWorldBounds(true);
        this.target = target;
        this.minDistance = 10;
        this.history = [];
        this.historyLength = 5;
        this.maxSpeed = 250;
        this.x = x;
        this.y = y;

        this.anims.create({
            key: 'stand',
            frames: scene.anims.generateFrameNames('pet', {
                prefix: 'stand',
                start: 1,
                end: 6,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNames('pet', {
                prefix: 'walk',
                start: 1,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'rest',
            frames: this.scene.anims.generateFrameNames('pet', {
                prefix: 'rest',
                start: 1,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });
    }
    update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
        //gap : player와 pet 사이의 거리
        const gap = {
            x: Math.abs(this.target.body.position.x - this.body?.position.x!),
            y: Math.abs(this.target.body.position.y - this.body?.position.y!)
        };

        //keyboard event
        if (cursors.down) {
            this.targetMoving = true;
        } else {
            this.targetMoving = false;
        }
        if (cursors.left.isDown) {
            setTimeout(() => {
                this.setFlipX(false);
                //@ts-ignore
                if (this.body.blocked.down) this.play('walk', true);
            }, 200);
        } else if (cursors.right.isDown) {
            setTimeout(() => {
                this.setFlipX(true);
                //@ts-ignore
                if (this.body.blocked.down) this.play('walk', true);
            }, 200);
        } else {
            //@ts-ignore
            if (gap.x > this.midLine) {
                if (this.body?.blocked.down) this.play('walk', true);
                if (this.target.body.position.x - this.body?.position.x! > 0 && this.flipX) this.setVelocityX(400);
                else if (this.target.body.position.x - this.body?.position.x! < 0 && !this.flipX) this.setVelocityX(-400);
            } else {
                // if (this.body?.blocked.down) this.play('stand', true);
                if (!this.target.dead && this.target.attacked) this.play('attack');
            }
        }
        //@ts-ignore
        if (cursors.space.isDown && this.body.blocked.down) {
            this.setVelocityY(-1200);
        }

        //target(player) 움직일 때
        if (this.targetMoving) {
            //player와 pet이 바라보는 방향이 서로 다를 때(오른쪽 주시할 때 player는 false, pet은 true)
            if (this.target.flipX === this.flipX) {
                if (gap.x <= this.minLine) {
                    this.setVelocity(0);
                }
            }
            if (this.target.flipX === this.flipX) return;

            //Pet이 player와 deadLind 이상으로 거리상 차이가 날 때
            if (gap.x > this.deadLine || gap.y > this.deadLine) {
                setTimeout(() => {
                    this.x = this.target.x;
                    this.y = this.target.y;
                }, 800);

                //Pet이 daedLind 안에는 있지만 minLine보다는 밖에 있을 때
            } else if (gap.x > this.minLine && gap.x <= this.midLine) {
                this.setVelocityX(this.target.body.velocity.x);
            }

            //pet이 player와 반대 방향을 주시하거나 minLine 안에 있을 때에는 정지
        } else {
            this.setVelocity(0, 0);
        }
    }
    attack() {
        this.anims.create({
            key: 'attack',
            frames: this.scene.anims.generateFrameNames('pet', {
                prefix: 'attack',
                start: 1,
                end: 1,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });

        this.play('attack');
    }
}
