import Player from "../Player";

export default class Pet extends Phaser.Physics.Arcade.Sprite {
  [x: string]: any;
  dead = false;
  rest = false;
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
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string,
    frame: string,
    target: Player
  ) {
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
    this.rest = false;

    this.anims.create({
      key: "stand",
      frames: scene.anims.generateFrameNames("pet", {
        prefix: "stand",
        start: 1,
        end: 6,
        zeroPad: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walk",
      frames: this.scene.anims.generateFrameNames("pet", {
        prefix: "walk",
        start: 1,
        end: 2,
        zeroPad: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "rest",
      frames: this.scene.anims.generateFrameNames("pet", {
        prefix: "rest",
        start: 1,
        end: 2,
        zeroPad: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }
  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    //gap : player와 pet 사이의 거리
    const gap = {
      x: Math.abs(this.target.body.position.x - this.body?.position.x!),
      y: Math.abs(this.target.body.position.y - this.body?.position.y!),
    };

    const gapX = this.target.body.position.x - this.body?.position.x!;
    console.log(gapX);

    //keyboard event
    if (cursors.down) {
      this.targetMoving = true;
    } else {
      this.targetMoving = false;
    }
    if (cursors.left.isDown) {
      this.setFlipX(false);
      //@ts-ignore
      if (gapX < 0 && this.body?.blocked.down) this.play("walk", true);
      if (gap.x > this.minLine && gapX < 0)
        this.setVelocityX(this.target.body.velocity.x);
    } else if (cursors.right.isDown) {
      this.setFlipX(true);
      //@ts-ignore
      if (gapX > 0 && this.body?.blocked.down) this.play("walk", true);
      if (gap.x > this.minLine && gapX > 0)
        this.setVelocityX(this.target.body.velocity.x);
    } else {
      if (gap.x > this.minLine && gap.x <= this.deadLine) {
        if (gap.x > this.minLine && gapX < 0) this.setVelocityX(-400);
        else if (gap.x > this.minLine && gapX > 0) this.setVelocityX(400);
        this.play("walk", true);
      } else {
        this.setVelocityX(0);
        if (this.rest) this.play("rest", true);
        else this.play("stand", true);
      }
      console.log(gap.x > this.minLine && gap.x <= this.deadLine);
    }
    if (!this.target.dead && this.target.attacked) this.play("attack");

    if ((cursors.left.isDown && gapX > 0) || (cursors.right.isDown && gapX < 0))
      return;
    //@ts-ignore
    if (cursors.space.isDown && this.body.blocked.down) {
      this.setVelocityY(-1200);
    }

    //소환
    if (gap.x > this.deadLine || gap.y > this.deadLine) {
      setTimeout(() => {
        this.x = this.target.x;
        this.y = this.target.y;
      }, 800);
    }
  }
  attack() {
    this.anims.create({
      key: "attack",
      frames: this.scene.anims.generateFrameNames("pet", {
        prefix: "attack",
        start: 1,
        end: 1,
        zeroPad: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.play("attack");
  }
}
