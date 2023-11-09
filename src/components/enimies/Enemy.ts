export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  dead: boolean;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string
  ) {
    super(scene, x, y, texture, frame);
    this.name = texture;
    this.dead = false;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    //@ts-ignore
    this.body.setAllowGravity(false);
    this.setImmovable(true);
  }
  kill() {
    this.dead = true;
    this.setVelocity(0);
    return new Promise((resolve) => {
      this.play("dead").on("animationcomplete", () => {
        this.destroy();
        resolve("resolve");
      });
    });
  }
  update(...args: any[]): void {
    if (this.dead) return;
    super.update(...args);
  }
}
