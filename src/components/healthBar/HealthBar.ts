export default class HealthBar {
  bar!: Phaser.GameObjects.Graphics;
  x!: number;
  y!: number;
  value!: number;
  p!: number;
  constructor(scene: Phaser.Scene) {
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

    // //  BG
    // this.bar.fillStyle(0x000000);
    // this.bar.fillRect(this.x - 80, this.y, 250, 30);

    //  Health

    // this.bar.fillStyle(0xffffff);
    // this.bar.fillRect(this.x + 2, this.y + 2, 246, 26);

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
    if (this.value > 1476) this.value = 1476;
    this.draw();
  }
  decreaseHp(attak: number) {
    this.value -= attak;
    if (this.value < 0) this.value = 0;
    this.draw();
  }
}
