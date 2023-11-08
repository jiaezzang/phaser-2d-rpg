import { Background } from "../Background";
import Player from "../Player";
import MiniMap from "../MiniMap";
import Fire from "../attacks/Fire";
import Effect from "../attacks/Effect";
import Wind from "../attacks/Wind";
import Portal from "../portal/portal";
import Mushroom from "../enimies/Mushroom";
import Golem from "../enimies/Golem";
import Monster from "../enimies/Monster";
import Reward from "../reward/reward";

export default class DisplayScene extends Phaser.Scene {
  player!: Player;
  background!: Background;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  tileMap!: Phaser.GameObjects.TileSprite;
  minimap!: MiniMap;
  mushroom!: Mushroom;
  golem!: Golem;
  monster!: Monster;
  fire!: Fire;
  effect!: Effect;
  wind!: Wind;
  keyZ!: Phaser.Input.Keyboard.Key;
  keyX!: Phaser.Input.Keyboard.Key;
  keyC!: Phaser.Input.Keyboard.Key;
  portal!: Portal;
  reward!: Reward;
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
    this.background = new Background(this);
    this.monster = new Monster(this, {
      id: 4,
      name: "monster",
      type: "monster",
      x: 2500,
      y: 2000,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 2500 },
        { name: "min", type: "float", value: 1800 },
        { name: "velocity", type: "float", value: 100 },
      ],
    });
    this.mushroom = new Mushroom(this, {
      id: 5,
      name: "mushroom",
      type: "mushroom",
      x: 500,
      y: 2000,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 800 },
        { name: "min", type: "float", value: 400 },
        { name: "velocity", type: "float", value: 100 },
      ],
    });
    this.golem = new Golem(this, {
      id: 6,
      name: "golem",
      type: "golem",
      x: 1400,
      y: 1780,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 2000 },
        { name: "min", type: "float", value: 1400 },
        { name: "velocity", type: "float", value: 100 },
      ],
    });
    this.fire = new Fire(this, {
      id: 4,
      name: "fire",
      type: "fire",
      x: 1800,
      y: 1800,
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
      y: 1800,
      width: 0,
      height: 0,
      properties: [
        { name: "max", type: "float", value: 1800 },
        { name: "min", type: "float", value: 1500 },
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
    this.portal = new Portal(this, 1000, 2250, "portal");
    this.reward = new Reward(this, 1500, 1500, "reward");

    this.player = new Player(this, 0, 800, "player", "stand1");
    // console.log('create! s');

    this.mushroom.setBounce(0.3);

    // keyboard
    //@ts-ignore
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyZ = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.keyX = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.keyC = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    console.log(this.keyZ);

    //map
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("texture", "platforms") ?? "";
    const platforms = map.createLayer("platforms", tileset);
    platforms?.setCollisionByExclusion([-1]);
    if (platforms) this.platformsLayer = platforms;
    // this.platformsLayer.setScale(0.5);
    // this.platformsLayer.setPosition(0, 1200);
    // this.mushroom.checkCollision.down = false;

    const platformGroup = this.physics.add.staticGroup();
    //tile collides
    const tileBodies = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.collides)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 10, tile.y * 10 + 140, 10, tile.properties.height)
          .setOrigin(0, 1);
      });
    platformGroup.addMultiple(tileBodies);
    console.log(tileBodies);
    tileBodies.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = false;
      ///@ts-ignore
      el.body.checkCollision.left = false;
      ///@ts-ignore
      el.body.checkCollision.right = false;
    });
    //tile collides : climb
    const tileClimb = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.climb)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 10, tile.y * 10 + 140, 10, tile.properties.height)
          .setOrigin(0, 1);
      });
    platformGroup.addMultiple(tileClimb);
    console.log(tileBodies);
    tileClimb.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = false;
    });

    this.physics.add.collider(platformGroup, this.player);
    this.physics.add.collider(this.player, this.mushroom, () => {
      this.input.enabled = false;
      this.player.setCollideWorldBounds(false);
      this.player.setTint(0xff0000);
      this.player
        .setVelocity(100, 200)
        .setBounce(1, 1)
        .setCollideWorldBounds(true);
      // this.cameras.main.shake(200, 0.010);
      setTimeout(() => {
        this.player.setTint();
        // this.player.checkCollision.none = false;
        this.player.setBounce(0);
        // this.player.setVelocityX(0).setBounceX(0)
      }, 1500);
    });

    this.player.setCollideWorldBounds(true);

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
    this.monster.update();
    this.mushroom.update();
    this.golem.update();
    this.fire.update();
    this.wind.update();
    this.effect.update();
    this.minimap.update(this.player);
    this.player.update(this.cursors);
    // this.Portal.update();
    if (this.keyZ.isDown) {
      console.log(1);
    }
    if (this.keyX.isDown) {
      console.log(1);
    }
    if (this.keyC.isDown) {
      console.log(1);
    }
  }
  // handleCollision(player: Player | undefined, enemy: Mushroom | undefined) {
  //   if (player === this.player && enemy === this.mushroom) {
  //     player.setTint(0xff0000);
  //     player.setBounce(0.5);
  //   }
  // }
}
