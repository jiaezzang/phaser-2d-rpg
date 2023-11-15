import { Background } from './Background';
import Player from '../../Player';
import MiniMap from '../../MiniMap';
import Portal from '../../portal/Portal';
import { enemy } from '../../../data';
import Pet from '../../pet/Pet';
import HealthBar from '../../healthBar/HealthBar';
import RedPotion from '../../reward/RedPotion';
import PurplePotion from '../../reward/PurplePotion';
import EnemiseGroup from '../../enimies/EnemyGroup';
import { createAttack } from '../../attacks/util';
import { TAttack } from '../../attacks/util';

export default class DisplayScene extends Phaser.Scene {
    player!: Player;
    playerType!: string;
    hpBar!: HealthBar;
    value!: number;
    bounding!: { x: number; y: number };
    background!: Background;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    tileMap!: Phaser.GameObjects.TileSprite;
    minimap!: MiniMap;
    enemies!: EnemiseGroup;
    attack!: TAttack;
    keyZ!: Phaser.Input.Keyboard.Key;
    keyX!: Phaser.Input.Keyboard.Key;
    keyC!: Phaser.Input.Keyboard.Key;
    portal!: Portal;
    pet!: Pet;
    platformsLayer!: Phaser.Tilemaps.TilemapLayer;
    platformGroup!: any;
    potions!: Phaser.Physics.Arcade.Group;
    constructor() {
        super({ key: 'display' });
        console.log('cons! s');
    }
    init(data: { player: string; hpBarValue?: number; bounding: { x: number; y: number } }) {
        this.playerType = data.player;
        this.value = data.hpBarValue ?? 473;
        this.bounding = data.bounding ?? { x: 0, y: 1500 };
        console.log('init s');
    }
    preload() {
        console.log('preload s');
    }
    create() {
        this.sound.play('scene1', { loop: true });
        this.background = new Background(this);

        // 적
        this.enemies = new EnemiseGroup(this, enemy);

        // 플레이어
        this.player = new Player(this, this.bounding.x, this.bounding.y, 'player_' + this.playerType, 'stand1');

        // 포탈, 보상
        this.portal = new Portal(this, 5700, 1945, 'portal').setScale(0.6).setSize(120, 120);

        const fn = this.physics.add.overlap(this.portal, this.player, () => {
            if (this.cursors.up.isDown) {
                fn.active = false;
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.sound.stopAll();
                    this.sound.play('portal');
                    this.scene.start('store', { playerType: this.playerType, hpBar: this.hpBar.value });
                });
            }
        });

        //펫
        this.pet = new Pet(this, 0, 1500, 'pet', 'stand1', this.player);
        this.pet.setFlipX(true);
        this.pet.rest = false;

        //Health bar
        this.hpBar = new HealthBar(this, this.value);

        //potion
        this.potions = this.physics.add.group();

        // keyboard
        this.cursors = this.input.keyboard!.createCursorKeys();
        type KeyTypes = 'keyZ' | 'keyX' | 'keyC';
        ['Z', 'X', 'C'].forEach((key) => {
            const keyName = 'key' + `${key}`;
            this[keyName as KeyTypes] = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[key as 'Z' | 'X' | 'C']);
            this[keyName as KeyTypes].on('down', () => this.keydown(keyName));
        });

        //map
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('texture', 'platforms') ?? '';
        const platforms = map.createLayer('platforms', tileset);
        platforms?.setCollisionByExclusion([-1]);
        if (platforms) this.platformsLayer = platforms;
        this.platformsLayer.setScale(0.7);
        this.platformsLayer.setPosition(0, 600);

        this.platformGroup = this.physics.add.staticGroup();
        //tile collides
        const tileBodies = this.platformsLayer
            ///@ts-ignore
            .filterTiles((tile) => tile.properties.collides)
            .map((tile) => {
                return this.add.rectangle(tile.x * 7, tile.y * 7 + 617, 7, 7).setOrigin(0, 1);
            });
        this.platformGroup.addMultiple(tileBodies);
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
                return this.add.rectangle(tile.x * 7, tile.y * 7 + 617, 7, 7).setOrigin(0, 1);
            });
        this.platformGroup.addMultiple(tileClimb);
        tileClimb.forEach((el) => {
            ///@ts-ignore
            el.body.checkCollision.down = false;
        });
        //collider 부여
        this.physics.add.collider(this.platformGroup, this.player);
        this.physics.add.collider(this.platformGroup, this.pet);

        this.physics.add.overlap(this.player, this.enemies, () => {
            this.player.kill(this.hpBar.value);
            this.hpBar.decreaseHp(2);
            if (this.hpBar.value > 0) this.pet.attack();
            if (this.hpBar.value === 0) {
                this.cameras.main.fadeOut(1000, 0, 0, 0);
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.sound.stopAll();
                    this.sound.play('portal');
                    this.scene.start('store', { playerType: this.playerType, hpBar: this.hpBar.value });
                });
                this.player.setVelocity(0).stop();
            }
        });

        //camera & minimap
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, 5900, map.heightInPixels);
        this.minimap = new MiniMap(this, 20, 20, 300, map.heightInPixels / 15, map);
        this.minimap.camera.ignore(this.background);
        this.minimap.camera.ignore(this.hpBar.bar);
        this.minimap.camera.ignore(this.hpBar.hpbarImage);

        this.physics.world.setBounds(0, -200, map.widthInPixels, map.heightInPixels + 200);

        //index 설정
        this.player.setDepth(99);
        this.pet.setDepth(100);
        this.portal.setDepth(1);
    }
    update(): void {
        this.background.update();
        this.enemies.update();
        this.minimap.update(this.player);
        if (!this.player.dead) {
            this.player.update(this.cursors);
            this.pet.update(this.cursors);
        } else {
            this.player.setFrame('hit1').setVelocity(0).stop();
            this.pet.setFrame('attack1').setVelocity(0).stop();
        }
        this.getPotion();
    }
    keydown(key: string) {
        const x = this.player.flipX ? this.player.x - 50 : this.player.x + 100;
        const props = { x: x, y: this.player.y, flip: this.player.flipX };
        if (key === 'keyZ') {
            this.attack = createAttack(this, props, key, this.playerType) as TAttack;
            this.kill(this.enemies);
        } else if (key === 'keyX') {
            this.attack = createAttack(this, props, key, this.playerType) as TAttack;
            this.kill(this.enemies);
        } else if (key === 'keyC') {
            const monsters = this.enemies.getChildren().filter((child: any) => Phaser.Math.Distance.Between(this.player.x, this.player.y, child.x, child.y) <= 1000);
            monsters.forEach((monster: any) => {
                const props = { x: monster.x, y: monster.y };
                this.attack = createAttack(this, props, key, this.playerType) as TAttack;
                this.kill(monster);
            });
        }
        this.player.attack();
        this.attack.playSound();
    }
    kill(enemies: Phaser.Types.Physics.Arcade.ArcadeColliderType) {
        const fn = this.physics.add.overlap(enemies, this.attack, (monster: any) => {
            fn.active = false;
            if (monster.attacked < monster.flag) monster.attack();
            else {
                this.enemies.remove(monster);
                monster.kill().then(async (result: 'resolve') => {
                    if (result) {
                        const { name, x, y, flag, min, max } = monster;
                        this.addPotion(x, y, name);

                        await new Promise((r) => setTimeout(r, 4000));
                        this.addEnemy({ type: name, x: x, y: y, dead: flag, properties: { min: min, max: max } });
                    }
                });
            }
        });
        this.attack.attack();
    }
    addPotion(x: number, y: number, name: string) {
        if (['mushroom', 'pinkbean'].includes(name)) {
            const redPotion = new RedPotion(this, { x: x, y: y, texture: 'redPotion' });
            this.potions.add(redPotion);
            this.physics.add.collider(this.platformGroup, redPotion);
        } else {
            const purplePotion = new PurplePotion(this, { x: x, y: y, texture: 'purplePotion' });
            this.potions.add(purplePotion);
            this.physics.add.collider(this.platformGroup, purplePotion);
        }
    }
    addEnemy(props: TEnimiesProps) {
        const enemy = this.enemies.insert(props);
        if (enemy) this.enemies.add(enemy);
    }
    getPotion() {
        const children = this.potions.getChildren();
        children.forEach((child: any) => {
            if (Math.abs(this.pet.x - child.x) < 300 && Math.abs(this.pet.y - child.y) < 300) {
                if (this.pet.x - child.x > 0) this.pet.setFlipX(false);
                else this.pet.setFlipX(true);
                this.physics.moveToObject(this.pet, child, 500);
                // potion.setAngle(0)
                if (Math.abs(this.pet.x - child.x) < 30 && Math.abs(this.pet.y - child.y) < 30) {
                    child.destroy();
                    this.pet.body?.stop();
                    this.pet.setFlipX(!this.pet.flipX);
                    this.hpBar.increaseHP(child.name);
                }
            }
            this.physics.overlap(this.player, child, () => {
                this.hpBar.increaseHP(child.name);
                child.destroy();
            });
        });
    }
}
