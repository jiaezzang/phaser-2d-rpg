export default class Preloader extends Phaser.Scene {
  constructor() {
    super({ key: "preloader" });
  }
  preload() {
    this.load.setBaseURL("assets");
    this.load.image("bg1", "background/bg1.png");
    this.load.atlas("player", "player/poy.png", "player/poy.json");

    //tile
    this.load.image("platforms", "map/spritesheet_jumper.png");
    this.load.tilemapTiledJSON("map", "map/map.json");
  }
  create() {
    this.game.scene.start("display");
  }
}
