import { Background } from '../Background';
import Player from '../Player';
import MiniMap from '../MiniMap';
import Fire from '../attacks/Fire';
import Effect from '../attacks/Effect';
import Wind from '../attacks/Wind';
import Portal from '../portal/Portal';
import Mushroom from '../enimies/Mushroom';
import Golem from '../enimies/Golem';
import PsycoJack from '../enimies/PsycoJack';
import PinkBean from '../enimies/PinkBean';
import Gallopera from '../enimies/Gallopera';
import Reward from '../reward/Reward';

export default class DisplayScene extends Phaser.Scene {
    player!: Player;
    background!: Background;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    tileMap!: Phaser.GameObjects.TileSprite;
    minimap!: MiniMap;
    mushroom!: Mushroom;
    golem!: Golem;
    pinkbean!: PinkBean;
    gallopera!: Gallopera;
    psycojack!: PsycoJack;
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
        super({ key: 'display' });
        console.log('cons! s');
    }
    init() {
        console.log('init s');
    }
    preload() {
        console.log('preload s');
    }
    create() {
        this.background = new Background(this);

        // 적 생성
        this.pinkbean = new PinkBean(this, { x: 2500, y: 2000, properties: { min: 1800, max: 2500 } });
        this.mushroom = new Mushroom(this, { x: 500, y: 2000, properties: { max: 800, min: 400 } });
        this.golem = new Golem(this, { x: 1800, y: 2200, properties: { min: 1800, max: 2300 } });
        this.gallopera = new Gallopera(this, { x: 1400, y: 1780, properties: { min: 1400, max: 2000 } });
        this.psycojack = new PsycoJack(this, { x: 1000, y: 1300, properties: { min: 1000, max: 1500 } });

        // 포탈, 보상
        this.portal = new Portal(this, 1000, 2250, 'portal');
        this.reward = new Reward(this, 1500, 1500, 'reward');

        // 플레이어
        this.player = new Player(this, 0, 800, 'player', 'stand1');
        // console.log('create! s');

        // keyboard
        //@ts-ignore

        this.cursors = this.input.keyboard!.createCursorKeys();
        const keys = [
            { key: 'Z', value: 'wind' },
            { key: 'X', value: 'fire' },
            { key: 'C', value: 'effect' }
        ];
        type KeyTypes = 'keyZ' | 'keyX' | 'keyC';
        keys.forEach((keyArray) => {
            const key = 'key' + `${keyArray.key}`;
            this[key as KeyTypes] = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[keyArray.key as 'Z' | 'X' | 'C']);
            this[key as KeyTypes].on('down', () => {
                const x = this.player.flipX ? this.player.x - 50 : this.player.x + 100;
                this.wind = new Wind(this, { x: x, y: this.player.y, flip: this.player.flipX });
                this.physics.add.collider(this.mushroom, this.wind, () => {
                    if (this.mushroom.attack < 3) this.mushroom.setFrame('attack1');
                });
                this.mushroom.kill();
            }); // 바람을 불러일으키는 함수만 생성하면 된다.
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

        //camera & minimap
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.minimap = new MiniMap(this, 20, 20, 300, map.heightInPixels / 15, map);
        this.minimap.camera.ignore(this.background);

        this.physics.world.setBounds(0, -200, map.widthInPixels, map.heightInPixels + 200);
    }
    update(): void {
        this.background.update();
        this.pinkbean.update();
        this.mushroom.update();
        this.golem.update();
        this.psycojack.update();
        this.gallopera.update();
        this.minimap.update(this.player);
        this.player.update(this.cursors);
    }
    // attack(type: string) {
    //     const x = this.player.flipX ? this.player.x - 50 : this.player.x + 100;
    //     if (type === 'wind') {
    //         this.wind = new Wind(this, { x: x, y: this.player.y, flip: this.player.flipX });
    //         this.physics.add.collider(this.mushroom, this.wind, () => {
    //             console.log(1);
    //         });
    //         this.mushroom.kill();
    //     } else if (type === 'effect') {
    //         this.effect = new Effect(this, { x: x, y: this.player.y, flip: this.player.flipX });
    //         this.physics.add.collider(this.mushroom, this.effect, () => {
    //             this.mushroom.setFrame('attack1');
    //         });
    //     } else if (type === 'fire') {
    //         this.fire = new Fire(this, { x: x, y: this.player.y, flip: this.player.flipX });
    //         this.physics.add.collider(this.mushroom, this.fire, () => {
    //             this.mushroom.setFrame('attack1');
    //         });
    //     }
    // }
}
