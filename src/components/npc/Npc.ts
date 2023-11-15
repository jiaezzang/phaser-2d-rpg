export default class Npc extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame: string
  ) {
    super(scene, x, y, texture, frame);
    scene.physics.world.enable(this);
    this.setOrigin(0, 0);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    this.setImmovable(true);

    this.anims.create({
      key: "stand",
      frames: scene.anims.generateFrameNames("npc", {
        prefix: "stand1",
        start: 1,
        end: 8,
        zeroPad: 1,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }

  update() {
    this.play("stand");
  }
}
