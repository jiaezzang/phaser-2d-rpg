import { Background } from "../Background";
import Player from "../components/Player";
import Enemy from "../enimies/Enemy";
import BeeEnemy from "../enimies/BeeEnemy";
import WormEnemy from "../enimies/WormEnemy";
import BirdEnemy from "../enimies/Bird";
import SealEnemy from "../enimies/SealEnemy";

export default class DisplayScene extends Phaser.Scene {
  player!: Player;
  background!: Background;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  tileMap!: Phaser.GameObjects.TileSprite;
  enemy!: Enemy;
  wormEnemy!: WormEnemy;
  bird!: BirdEnemy;
  seal!: SealEnemy;
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
    this.enemy = new BeeEnemy(this, {
      id: 1,
      name: "bee",
      type: "bee",
      x: 1000,
      y: 500,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 800 },
        { name: "min", type: "float", value: 500 },
        { name: "velocity", type: "float", value: 40 },
      ],
    });
    this.wormEnemy = new WormEnemy(this, {
      id: 2,
      name: "worm",
      type: "worm",
      x: 1000,
      y: 800,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 1300 },
        { name: "min", type: "float", value: 300 },
        { name: "velocity", type: "float", value: 200 },
      ],
    });
    this.bird = new BirdEnemy(this, {
      id: 3,
      name: "bird",
      type: "bird",
      x: 500,
      y: 800,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 400 },
        { name: "min", type: "float", value: 200 },
        { name: "velocity", type: "float", value: 200 },
      ],
    });
    this.seal = new SealEnemy(this, {
      id: 4,
      name: "seal",
      type: "seal",
      x: 1000,
      y: 800,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 1300 },
        { name: "min", type: "float", value: 500 },
        { name: "velocity", type: "float", value: 100 },
      ],
    });

    this.player = new Player(this, 0, 800, "player", "stand1");

    console.log("create! s");

    //keyboard
    this.cursors = this.input.keyboard.createCursorKeys();

    //map
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("texture", "platforms");
    if (tileset) {
      const platforms = map.createLayer("platforms", tileset);
      platforms?.setCollisionByExclusion([-1]);
      platforms?.setPosition(0, 0);
      if (platforms) this.physics.add.collider(this.player, platforms);
      platforms?.setScale(0.5);
    }
  }
  update(time: number, delta: number): void {
    this.background.update();
    this.enemy.update();
    this.bird.update();
    this.wormEnemy.update();
    this.seal.update();
    this.player.update(this.cursors);
  }
}
