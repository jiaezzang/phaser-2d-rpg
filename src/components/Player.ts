export default class Player extends Phaser.Physics.Arcade.Sprite {
  [x: string]: any;
  _attack = false;
  attacked = false;
  dead = false;
  constructor(
    scene: Phaser.Scene,
    x: number = 0,
    y: number = 0,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setOrigin(0, 1);
    this.setDisplayOrigin(0, 1);
    this.setSize(50, 152);
    this.setCollideWorldBounds(true);

    this.anims.create({
      key: "stand",
      frames: scene.anims.generateFrameNames(texture, {
        prefix: "stand",
        start: 1,
        end: 5,
        zeroPad: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: "walk",
      frames: scene.anims.generateFrameNames(texture, {
        prefix: "walk",
        start: 1,
        end: 6,
        zeroPad: 1,
      }),
      frameRate: 8,
      repeat: 1,
    });
    this.anims.create({
      key: "attack",
      frames: scene.anims.generateFrameNames(texture, {
        prefix: "attack",
        start: 1,
        end: 4,
        zeroPad: 1,
      }),
      frameRate: 8,
      repeat: 1,
    });
    this.anims.create({
      key: "jumpstart",
      frames: scene.anims.generateFrameNames(texture, {
        prefix: "jumpstart",
        start: 1,
        end: 2,
        zeroPad: 1,
      }),
      frameRate: 8,
      repeat: 2,
    });
    this.setScale(0.7);
  }
  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {
    // if(this.dead) return;
    if (cursors.left.isDown) {
      this.setVelocityX(-400);
      this.setFlipX(true);
      //@ts-ignore
      if (this.body.blocked.down && !this._attack) this.play("walk", true);
    } else if (cursors.right.isDown) {
      this.setVelocityX(400);
      this.setFlipX(false);
      //@ts-ignore
      if (this.body.blocked.down && !this._attack) this.play("walk", true);
    } else {
      this.setVelocityX(0);
      if (this.body?.blocked.down && !this._attack) this.play("stand");
      if (!this.dead && this.attacked) this.setFrame("hit1");
      //@ts-ignore
    }
    //@ts-ignore
    if (cursors.space.isDown && this.body.blocked.down) {
      this.jump();
      this.setVelocityY(-1250);
    }

    if (this.x + this.width >= 6000) {
      this.setVelocityX(0);
      this.x = 6000 - this.width;
    }
  }
  jump() {
    this.play("jumpstart", true).on("animationcomplete", () =>
      this.play("stand")
    );
  }
  attack() {
    this.play("attack", true);
    this._attack = true;
    setTimeout(() => {
      this._attack = false;
    }, 1000);
  }
  kill(hp: number) {
    if (hp === 0) this.dead = true;
    if (hp === 0) return;
    this.attacked = true;
    this.setTint(0xff0000);
    setTimeout(() => {
      this.setTint();
      this.attacked = false;
    }, 1000);

    this.setFrame("hit1");
  }
}
