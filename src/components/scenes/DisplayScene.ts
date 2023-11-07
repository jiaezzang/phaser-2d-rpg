import { Background } from "../Background";
import Player from "../Player";
import Enemy from "../enimies/Enemy";
import BeeEnemy from "../enimies/BeeEnemy";
import WormEnemy from "../enimies/WormEnemy";
import BirdEnemy from "../enimies/Bird";
import SealEnemy from "../enimies/SealEnemy";
import MiniMap from "../MiniMap";
import Fire from "../attacks/Fire";
import Effect from "../attacks/Effect";
import Wind from "../attacks/Wind";

export default class DisplayScene extends Phaser.Scene {
  player!: Player;
  background!: Background;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  tileMap!: Phaser.GameObjects.TileSprite;
  platformsLayer!: Phaser.Tilemaps.TilemapLayer;
  enemy!: Enemy;
  minimap!: MiniMap;
  wormEnemy!: WormEnemy;
  bird!: BirdEnemy;
  seal!: SealEnemy;
  fire!: Fire;
  effect!: Effect;
  wind!: Wind;
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
    // this.physics.add.staticImage(100, 100, "platforms").setOrigin(10, 10);

    this.enemy = new BeeEnemy(this, {
      id: 1,
      name: "bee",
      type: "bee",
      x: 1000,
      y: 1000,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 1000 },
        { name: "min", type: "float", value: 800 },
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
        { name: "max", type: "float", value: 1000 },
        { name: "min", type: "float", value: 700 },
        { name: "velocity", type: "float", value: 200 },
      ],
    });
    this.bird = new BirdEnemy(this, {
      id: 3,
      name: "bird",
      type: "bird",
      x: 500,
      y: 1000,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 1300 },
        { name: "min", type: "float", value: 800 },
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
    this.fire = new Fire(this, {
      id: 4,
      name: "fire",
      type: "fire",
      x: 1800,
      y: 800,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 1300 },
        { name: "min", type: "float", value: 500 },
        { name: "velocity", type: "float", value: 100 },
      ],
    });
    this.effect = new Effect(this, {
      id: 4,
      name: "effect",
      type: "effect",
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
    this.wind = new Wind(this, {
      id: 5,
      name: "wind",
      type: "wind",
      x: 1000,
      y: 1300,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 1300 },
        { name: "min", type: "float", value: 500 },
        { name: "velocity", type: "float", value: 300 },
      ],
    });

    this.player = new Player(this, 0, 0, "player", "stand1");

    // keyboard
    //@ts-ignore
    this.cursors = this.input.keyboard.createCursorKeys();

    //map
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("texture", "platforms") ?? "";
    const platforms = map.createLayer("platforms", tileset);
    platforms?.setCollisionByExclusion([-1]);
    if (platforms) this.platformsLayer = platforms;
    this.platformsLayer.setScale(0.5);
    const platformGroup = this.physics.add.staticGroup();
    const tileBodies = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.collides)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 40, tile.y * 40 + 160, 40, tile.properties.height)
          .setOrigin(0, 1);
      });
    platformGroup.addMultiple(tileBodies);
    tileBodies.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = false;
      ///@ts-ignore
      el.body.checkCollision.left = false;
      ///@ts-ignore
      el.body.checkCollision.right = false;
    });
    this.physics.add.collider(platformGroup, this.player);

    //camera&minimap
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.minimap = new MiniMap(this, 20, 80, 300, map.heightInPixels / 10, map);
    this.minimap.camera.ignore(this.background);
    
    this.physics.world.setBounds(
      0,
      -200,
      map.widthInPixels,
      map.heightInPixels + 200
    );
  }
  update(time: number, delta: number): void {
    this.background.update();
    this.enemy.update();
    this.bird.update();
    this.wormEnemy.update();
    this.seal.update();
    this.fire.update();
    this.wind.update();
    this.effect.update();
    this.minimap.update(this.player);
    this.player.update(this.cursors);
  }
}
