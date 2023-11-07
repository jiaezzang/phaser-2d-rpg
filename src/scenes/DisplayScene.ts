import { Background } from "../Background";
import Player from "../components/Player";
export default class DisplayScene extends Phaser.Scene {
  player!: Player;
  background!: Background;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  tileMap!: Phaser.GameObjects.TileSprite;
  platformsLayer!: Phaser.Tilemaps.TilemapLayer;
  constructor() {
    super({ key: "display" });
    console.log("cons! s");
  }
  init() {
    console.log("init s");
  }
  preload() {
    console.log("preload s");
  }
  create() {
    this.load.start()
    this.background = new Background(this);
    this.player = new Player(this, 0, 800, "player", "stand1");
    console.log("create! s");

    /** keyboard, input */
    this.cursors = this.input.keyboard.createCursorKeys();

    //map
    const map = this.make.tilemap({ key: "map" });
    console.log(map);
    //Tileset이 생성되지 않음
    const tileset = map.addTilesetImage("map", "platforms");
    console.log(tileset);

    if (tileset) {
      console.log("complete");
      const platforms = map.createLayer("platforms", tileset);
      if (platforms) this.platformsLayer = platforms ?? '';
      platforms?.setCollisionByExclusion([-1]);
      if (platforms) this.physics.add.collider(this.player, platforms);
    }
  }
  update(time: number, delta: number): void {
    this.background.update();
    this.player.update(this.cursors);
  }
}
