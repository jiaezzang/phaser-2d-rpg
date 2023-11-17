import Attack from "./Attack";

export default class IceScratch extends Attack {
  movingVelocity = 200;
  constructor(scene: Phaser.Scene, config: TAttackProps) {
    super(scene, config.x ?? 0, config.y ?? 0, "iceScratch", "attack1");
    this.movingVelocity = config.flip ? -200 : +200;

    this.anims.create({
      key: "attack",
      frames: scene.anims.generateFrameNames("iceScratch", {
        prefix: "attack",
        start: 1,
        end: 11,
        zeroPad: 1,
      }),
      frameRate: 10,
      repeat: 0,
    });

    this.setVelocityX(this.movingVelocity);
  }

  playSound() {
    this.scene.sound.play("wind");
  }
}
