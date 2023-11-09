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
    this.setFrame("dead");
    this.scene.tweens.add({
      targets: this,
      delay: 300,
      duration: 600,
      alpha: 0,
      onComplete: () => {
        this.destroy();
      },
    });

    this.stop();
    this.setVelocity(0);
  }
  update(...args: any[]): void {
    if (this.dead) return;
    super.update(...args);
  }
}
