export default class HealthBar extends Phaser.GameObjects.Graphics {
  bar!: Phaser.GameObjects.Graphics;
  hpbarImage!: Phaser.GameObjects.Image;
  value!: number;
  p!: number;
  updateTween!: any;
  currentHp!: number;
  newHp!: number;
  hp!: number;

  constructor(scene: Phaser.Scene) {
    super(scene);
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = window.innerWidth - 180;
    this.y = 50;
    this.value = 473;
    this.p = 1 / 2;

    this.hpbarImage = scene.add.image(this.x, this.y, "hpbar");
    this.hpbarImage.setScale(0.3).setScrollFactor(0).setDepth(1);
    this.draw();
    this.bar.setScrollFactor(0);
    this.bar.setDepth(1);
    scene.add.existing(this.bar);
  }
  create() {}
  draw() {
    this.bar.clear();

    if (this.value < 30) {
      this.bar.fillStyle(0xf5000a);
    } else {
      this.bar.fillStyle(0xf5000a);
    }

    var d = Math.floor(this.p * this.value);
    this.bar.fillRect(this.x - 82 + 2, this.y + 3, d, 23);
  }
  increaseHP(type: string) {
    if (type === "redPotion") this.hp = 60;
    else if (type === "purplePotion") this.hp = 180;

    this.currentHp = this.value;
    this.newHp = this.value + this.hp;

    if (this.updateTween && this.updateTween.isPlaying()) {
      this.updateTween.on("complete", () => {
        this.currentHp = this.newHp;
        this.newHp += this.hp;
        this.updateTween = this.scene.tweens.addCounter({
          from: this.value,
          to: this.value + this.hp,
          duration: 500,
          ease: "linear",
          onUpdate: (tween) => {
            this.value = Math.round(tween.getValue());
            if (this.value >= 473) this.value = 473;
            this.draw();
          },
        });
      });
    } else {
      this.updateTween = this.scene.tweens.addCounter({
        from: this.value,
        to: this.value + this.hp,
        duration: 500,
        ease: "linear",
        onUpdate: (tween) => {
          this.value = Math.round(tween.getValue());
          if (this.value >= 473) this.value = 473;
          this.draw();
        },
      });
    }
  }
  decreaseHp(attak: number) {
    this.value -= attak;
    if (this.value <= 0) this.value = 0;
    this.draw();
  }
}
