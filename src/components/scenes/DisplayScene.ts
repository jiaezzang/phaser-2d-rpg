import { Background } from "../Background";
import Player from "../Player";
import MiniMap from "../MiniMap";
import Fire from "../attacks/Fire";
import Effect from "../attacks/Effect";
import Wind from "../attacks/Wind";
import Portal from "../portal/Portal";
import Mushroom from "../enimies/Mushroom";
import Golem from "../enimies/Golem";
import PsycoJack from "../enimies/PsycoJack";
import PinkBean from "../enimies/PinkBean";
import Gallopera from "../enimies/Gallopera";
// import Reward from '../reward/Reward';
import { enemy } from "../../data";
import Pet from "../pet/Pet";
import RedPotion from "../reward/RedPotion";

export default class DisplayScene extends Phaser.Scene {
  player!: Player;
  background!: Background;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  tileMap!: Phaser.GameObjects.TileSprite;
  minimap!: MiniMap;
  enemies!: any[];
  enemy!: any;
  fire!: Fire;
  effect!: Effect;
  wind!: Wind;
  keyZ!: Phaser.Input.Keyboard.Key;
  keyX!: Phaser.Input.Keyboard.Key;
  keyC!: Phaser.Input.Keyboard.Key;
  portal!: Portal;
  pet!: Pet;
  // reward!: Reward;
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

    this.enemies = [];
    enemy.forEach((_enemy) => {
      const { type, x, y, dead, properties } = _enemy;
      if (type === "pinkbean") {
        this.enemies.push(
          new PinkBean(this, { x: x, y: y, flag: dead, properties: properties })
        );
      } else if (type === "mushroom") {
        this.enemies.push(
          new Mushroom(this, { x: x, y: y, flag: dead, properties: properties })
        );
      } else if (type === "golem") {
        this.enemies.push(
          new Golem(this, { x: x, y: y, flag: dead, properties: properties })
        );
      } else if (type === "psycojack") {
        this.enemies.push(
          new PsycoJack(this, {
            x: x,
            y: y,
            flag: dead,
            properties: properties,
          })
        );
      } else if (type === "gallopera") {
        this.enemies.push(
          new Gallopera(this, {
            x: x,
            y: y,
            flag: dead,
            properties: properties,
          })
        );
      }
    });

    // 포탈, 보상
    this.portal = new Portal(this, 1000, 2250, "portal");
    // this.reward = new Reward(this, 1500, 1500, "reward");

    // 플레이어
    this.player = new Player(this, 0, 1500, "player", "stand1");

    //펫
    this.pet = new Pet(this, 0, 1500, "pet", "stand", this.player);
    this.pet.setFlipX(true);
    // keyboard
    //@ts-ignore

    this.cursors = this.input.keyboard?.createCursorKeys();
    const keys = [
      { key: "Z", value: "wind" },
      { key: "X", value: "fire" },
      { key: "C", value: "effect" },
    ];
    type KeyTypes = "keyZ" | "keyX" | "keyC";
    keys.forEach((keyArray) => {
      const key = "key" + `${keyArray.key}`;
      this[key as KeyTypes] = this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes[keyArray.key as "Z" | "X" | "C"]
      );
      this[key as KeyTypes].on("down", () => {
        const x = this.player.flipX ? this.player.x - 50 : this.player.x + 100;
        if (key === "keyZ") {
          this.wind = new Wind(this, {
            x: x,
            y: this.player.y,
            flip: this.player.flipX,
          });
        } else if (key === "keyX") {
          this.fire = new Fire(this, {
            x: x,
            y: this.player.y,
            flip: this.player.flipX,
          });
        } else if (key === "keyC") {
          this.effect = new Effect(this, {
            x: x,
            y: this.player.y,
            flip: this.player.flipX,
          });
        }
        this.physics.add.overlap(
          this.enemies,
          [this.wind, this.fire, this.effect],
          (monster: any) => {
            this.enemy = monster;
            if (this.enemy.attack >= this.enemy.flag) return;
            this.enemy.setFrame("attack1");
          }
        );
        const result = this.enemy?.kill();
        if (result) {
          result.then((data: string) => {
            const { x, y, flag } = this.enemy;
            if (data === "resolve") {
              new RedPotion(this, this.enemy.x, this.enemy.y, "redPotion");
              setTimeout(() => {
                this.enemies.push(
                  new Mushroom(this, {
                    x: x,
                    y: y,
                    flag: flag,
                    properties: { min: this.enemy.min, max: this.enemy.max },
                  })
                );
              }, 5000);
            }
          });
        }
      });
    });

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
          .rectangle(tile.x * 10, tile.y * 10 + 10, 10, 10)
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
    //tile collides : climb
    const tileClimb = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.climb)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 10, tile.y * 10 + 10, 10, 10)
          .setOrigin(0, 1);
      });
    platformGroup.addMultiple(tileClimb);
    tileClimb.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = false;
    });
    console.log(this.pet.anims);
    //collider 부여
    this.physics.add.collider(platformGroup, this.player);
    this.physics.add.collider(platformGroup, this.pet);
    this.physics.add.overlap(this.player, this.enemies, () => {
      this.player.kill();
      this.pet.attack();
    });

    //camera & minimap
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.minimap = new MiniMap(this, 20, 20, 300, map.heightInPixels / 15, map);
    this.minimap.camera.ignore(this.background);

    this.physics.world.setBounds(
      0,
      -200,
      map.widthInPixels,
      map.heightInPixels + 200
    );

    //index 설정
    this.player.setDepth(1);
    this.pet.setDepth(1);
  }
  update(): void {
    this.background.update();
    this.enemies.forEach((enemy) => enemy.update());
    this.minimap.update(this.player);
    this.player.update(this.cursors);
    this.pet.update(this.cursors);
  }
  // attack(monster: any) {
  //   monster.setFrame("attack1");
  // }
}
