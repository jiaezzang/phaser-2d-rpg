export default class HealthBar extends Phaser.GameObjects.Group {
  bar!: Phaser.GameObjects.Graphics;
  x!: number;
  y!: number;
  value!: number;
  p!: number;
  constructor(scene: Phaser.Scene) {
    super(scene)
    this.bar = new Phaser.GameObjects.Graphics(scene);
    this.x = window.innerWidth - 180;
    this.y = 50;
    this.value = 473;
    this.p = 1 / 2;

    const hpbarImage = scene.add.image(this.x, this.y, 'hpbar');
    hpbarImage.setScale(0.3).setScrollFactor(0).setDepth(1) ;
    console.log(hpbarImage)

    this.draw();
    this.bar.setScrollFactor(0);
    this.bar.setDepth(1);

    scene.add.existing(this.bar);
    scene.add.existing(hpbarImage);
  }
  create(){
    
  }
  draw() {
    this.bar.clear();

    if (this.value < 30) {
      this.bar.fillStyle(0xF5000A);
    } else {
      this.bar.fillStyle(0xF5000A);
    }

    var d = Math.floor(this.p * this.value);

    this.bar.fillRect(this.x - 82 + 2, this.y + 3, d, 23);
  }
  increaseHP(hp: number) {
    this.value += hp;
    if (this.value >= 946) this.value = 946;
    this.draw();
  }
  decreaseHp(attak: number) {
    this.value -= attak;
    if (this.value <= 0) this.value = 0;
    this.draw();
  }
}
