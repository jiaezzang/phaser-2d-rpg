import { Background } from "../Background";
import Player from "../components/Player";
export function makeTileLayer(
  map: Phaser.Tilemaps.Tilemap,
  tilesetName: string,
  assetKey: string,
  layerId: string
) {
  const tileset = map.addTilesetImage(tilesetName, assetKey);

  return map.createLayer(layerId, tileset);
}
export default class DisplayScene extends Phaser.Scene {
  player!: Player;
  background!: Background;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  tileMap!: Phaser.GameObjects.TileSprite;
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
    this.background = new Background(this);
    this.player = new Player(this, 0, 800, "player", "stand1");
    console.log("create! s");

    /** keyboard, input */
    this.cursors = this.input.keyboard.createCursorKeys();

    //map
    const map = this.make.tilemap({ key: "map" });
    console.log(map);
    // const tileset = map.addTilesetImage("map", "platforms");
    const platformsLayer = makeTileLayer(map, "map", "platforms", "platforms");

    console.log(platformsLayer);
    // if (tileset) {
    //   console.log("complete");
    //   const platforms = map.createLayer("platforms", tileset);
    //   platforms?.setCollisionByExclusion([-1]);
    //   if (platforms) this.physics.add.collider(this.player, platforms);
    // }
  }
  update(time: number, delta: number): void {
    this.background.update();
    this.player.update(this.cursors);
  }
}
