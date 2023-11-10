import { Background } from "../Background";
import Player from "../Player";
import MiniMap from "../MiniMap";
import Fire from "../attacks/Fire";
import Effect from "../attacks/Effect";
import Wind from "../attacks/Wind";
import Portal from "../portal/Portal";
import { enemy } from "../../data";
import Pet from "../pet/Pet";
import HealthBar from "../healthBar/HealthBar";
import RedPotion from "../reward/RedPotion";
import PurplePotion from "../reward/PurplePotion";
import EnemiseGroup from "../enimies/EnemyGroup";

export default class DisplayScene extends Phaser.Scene {
  player!: Player;
  hpBar!: HealthBar;
  background!: Background;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  tileMap!: Phaser.GameObjects.TileSprite;
  minimap!: MiniMap;
  enemies!: EnemiseGroup;
  attack!: Fire | Effect | Wind;
  keyZ!: Phaser.Input.Keyboard.Key;
  keyX!: Phaser.Input.Keyboard.Key;
  keyC!: Phaser.Input.Keyboard.Key;
  portal!: Portal;
  pet!: Pet;
  platformsLayer!: Phaser.Tilemaps.TilemapLayer;
  potions!: Phaser.Physics.Arcade.Image[];
  constructor() {
    super({ key: "display" });
    console.log("cons! s");
    this.potions = []
  }
  init() {
    console.log("init s");
  }
  preload() {
    console.log("preload s");
  }
  create() {
    this.background = new Background(this);

    // 적
    this.enemies = new EnemiseGroup(this, enemy);

    // 포탈, 보상
    this.portal = new Portal(this, 1000, 2250, "portal");

    // 플레이어
    this.player = new Player(this, 0, 1500, "player", "stand1");

    //펫
    this.pet = new Pet(this, 0, 1500, "pet", "stand1", this.player);
    this.pet.setFlipX(true);


    //Health bar
    this.hpBar = new HealthBar(this);
    // const hpBarContainer = this.add.container();
    // hpBarContainer.add(this.hpBar);

    // keyboard
    //@ts-ignore
    this.cursors = this.input.keyboard?.createCursorKeys();
    type KeyTypes = "keyZ" | "keyX" | "keyC";
    ["Z", "X", "C"].forEach((key) => {
      const keyName = "key" + `${key}`;
      this[keyName as KeyTypes] = this.input.keyboard!.addKey(
        Phaser.Input.Keyboard.KeyCodes[key as "Z" | "X" | "C"]
      );
      this[keyName as KeyTypes].on("down", () => {
        this.keydown(keyName);
        const fn = this.physics.add.overlap(
          this.enemies,
          this.attack,
          (monster: any) => {
            fn.active = false;
            if (monster.attacked < monster.flag) monster.attack();
            else {
              this.enemies.remove(monster);
              monster.kill().then(async (result: "resolve") => {
                if (result) {
                  const { name, x, y, flag, min, max } = monster;
                  this.addPotion(x, y, name);

                  await new Promise((r) => setTimeout(r, 4000));
                  this.addEnemy({
                    type: name,
                    x: x,
                    y: y,
                    dead: flag,
                    properties: { min: min, max: max },
                  });
                }
              });
            }
          }
        );
      });
    });

    //map
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("texture", "platforms") ?? "";
    const platforms = map.createLayer("platforms", tileset);
    platforms?.setCollisionByExclusion([-1]);
    if (platforms) this.platformsLayer = platforms;
    this.platformsLayer.setScale(0.7);
    this.platformsLayer.setPosition(0, 600);
    // this.mushroom.checkCollision.down = false;

    const platformGroup = this.physics.add.staticGroup();
    //tile collides
    const tileBodies = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.collides)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 7, tile.y * 7 + 607, 7, 7)
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
          .rectangle(tile.x * 7, tile.y * 7 + 607, 7, 7)
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
      this.player.kill(this.hpBar.value);
      this.hpBar.decreaseHp(2);
      if (this.hpBar.value > 0) this.pet.attack();
    });

    // //getPotions
    // console.log(this.potions)
    // if(this.potions && this.potions.length > 0) {
    // // this.potions.forEach((el) => {

    //   this.physics.add.overlap(this.player, this.potions[0], () => console.log('hahah'));
    // // })

    // const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.potions[0].x, this.potions[0].y);
    // console.log(distance)
    // const minDistance = 10;
    // if(distance <= minDistance) this.pet.getPotion(this.potions[0])
    // }

    

    //camera & minimap
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.minimap = new MiniMap(this, 20, 20, 300, map.heightInPixels / 15, map);
    this.minimap.camera.ignore(this.background);
    this.minimap.camera.ignore(this.hpBar);

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
    this.enemies.update();
    this.minimap.update(this.player);
    this.player.update(this.cursors);
    this.pet.update(this.cursors);
  }
  keydown(key: string) {
    const x = this.player.flipX ? this.player.x - 50 : this.player.x + 100;
    const props = { x: x, y: this.player.y, flip: this.player.flipX };
    if (key === "keyZ") {
      this.attack = new Wind(this, props);
    } else if (key === "keyX") {
      this.attack = new Fire(this, props);
    } else if (key === "keyC") {
      this.attack = new Effect(this, props);
    }
  }
  addPotion(x: number, y: number, name: string) {
    if (["mushroom", "pinkbean"].includes(name)) {
      const redPotion = new RedPotion(this, {x: x, y: y, texture: "redPotion"}, this.pet);
      this.potions.push(redPotion);
      console.log(this.potions)
    } else {
      const puplePotion = new PurplePotion(this, {x: x, y: y, texture: "purplePotion"}, this.pet);
      this.potions.push(puplePotion);
    }
  }
  addEnemy(props: TEnimiesProps) {
    const enemy = this.enemies.insert(props);
    if (enemy) this.enemies.add(enemy);
  }
}
