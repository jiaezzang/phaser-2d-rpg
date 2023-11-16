import Player from "../../Player";
import Pet from "../../pet/Pet";
import HealthBar from "../../healthBar/HealthBar";
import Portal from "../../portal/Portal";
import Npc from "../../npc/Npc";
import Bubble from "../../bubble/Bubble";

export default class StoreScene extends Phaser.Scene {
  player!: Player;
  playerType!: string;
  pet!: Pet;
  hpBar!: HealthBar;
  value!: number;
  portal!: Portal;
  timeKey!: number;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  platformsLayer!: Phaser.Tilemaps.TilemapLayer;
  platformGroup!: any;
  catTowerGroup!: any;
  lastKeyPressTime!: number;
  center!: number;
  map!: any;
  constructor() {
    super({ key: "store" });
  }
  init(data: { playerType: string; hpBar: number }) {
    this.playerType = data.playerType;
    this.value = data.hpBar;
  }
  create() {
    //map
    this.map = this.make.tilemap({ key: "storeMap" });
    this.center = window.innerWidth / 2 - this.map.widthInPixels / 2;
    const tileset = this.map.addTilesetImage("bg2", "storePlatforms") ?? "";
    const platforms = this.map.createLayer("platforms", tileset);
    platforms?.setCollisionByExclusion([-1]);
    if (platforms) this.platformsLayer = platforms;
    this.platformsLayer.setPosition(this.center, 0);

    this.platformGroup = this.physics.add.staticGroup();
    this.catTowerGroup = this.physics.add.staticGroup();
    //tile collides
    const tileBodies = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.collides)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 16 + this.center, tile.y * 16 + 20, 16, 16)
          .setOrigin(0, 1);
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

    //tile collides
    const catTowerBodies = this.platformsLayer
      ///@ts-ignore
      .filterTiles((tile) => tile.properties.cat)
      .map((tile) => {
        return this.add
          .rectangle(tile.x * 16 + this.center, tile.y * 16 + 20, 16, 16)
          .setOrigin(0, 1);
      });
    this.catTowerGroup.addMultiple(catTowerBodies);
    catTowerBodies.forEach((el) => {
      ///@ts-ignore
      el.body.checkCollision.down = false;
      ///@ts-ignore
      el.body.checkCollision.left = false;
      ///@ts-ignore
      el.body.checkCollision.right = false;
    });

    this.sound.play("scene2", { loop: true });
    // new Background(this, 0, 0, "background");
    this.timeKey = 0;
    this.hpBar = new HealthBar(this, this.value);
    const x = this.cameras.main.centerX;
    const y = window.innerHeight;
    this.portal = new Portal(this, window.innerWidth / 2 + 550, 840, "portal")
      .setScale(0.7)
      .setSize(120, 120);
    this.player = new Player(
      this,
      window.innerWidth / 2 + 550,
      780,
      "player_" + this.playerType,
      "stand1"
    )
      .setFlipX(true)
      .play("stand");
    this.pet = new Pet(
      this,
      window.innerWidth / 2 + 550,
      780,
      "blackPet",
      "stand1",
      this.player
    );
    this.pet.rest = true;

    //Cats
    const petFriend = new Pet(
      this,
      window.innerWidth / 2 + 450,
      400,
      "brownPet",
      "stand1",
      this.player
    ).setSize(30, 30);
    const petFriend2 = new Pet(
      this,
      window.innerWidth / 2 - 180,
      200,
      "brownPet",
      "walk3",
      this.player
    )
      .setFlipX(true)
      .setFrame("walk3");
    const petFriend3 = new Pet(
      this,
      window.innerWidth / 2 - 600,
      window.innerHeight / 2,
      "brownPet",
      "rest1",
      this.player
    )
      .setFlipX(true)
      .setScale(1.3)
      .setSize(30, 30);

    //NPC
    const npcBox = this.add.image(
      window.innerWidth / 2,
      window.innerHeight / 2,
      "npcBox"
    );
    npcBox.setVisible(false);
    const npcSprite = new Npc(
      this,
      window.innerWidth / 2 - 470,
      680,
      "npc",
      "stand1"
    ).setInteractive({ draggable: false, cursor: "pointer" });
    npcSprite.on("pointerdown", () => {
      npcBox.setVisible(true);
      boxClose.setVisible(true);
    });
    new Bubble(this, window.innerWidth / 2 - 470, 623);

    // NPC: 대화 그만하기
    const boxClose = this.add
      .rectangle(
        window.innerWidth / 2 - 250,
        window.innerHeight / 2 + 87,
        92,
        16
      )
      .setOrigin(0, 1)
      .setInteractive({ draggable: false, cursor: "pointer" });
    boxClose.on("pointerdown", () => {
      npcBox.setVisible(false);
      boxClose.setVisible(false);
    });

    //collider 부여
    this.physics.add.collider(this.platformGroup, this.player);

    [this.pet, petFriend, petFriend2, petFriend3].forEach((cat) => {
      this.physics.add.collider(this.catTowerGroup, cat);
      this.physics.add.collider(this.platformGroup, cat);
    });
    petFriend3.play("rest");

    this.cursors = this.input.keyboard!.createCursorKeys();

    this.timeKey = setInterval(() => {
      this.hpBar.increaseHP("redPotion");
    }, 10000);

    const fn = this.physics.add.overlap(this.portal, this.player, () => {
      if (this.cursors.up.isDown) {
        fn.active = false;
        clearInterval(this.timeKey);
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          () => {
            this.sound.stopAll();
            this.sound.play("portal");
            this.scene.start("display", {
              player: this.playerType,
              hpBarValue: this.hpBar.value,
              bounding: { x: 5500, y: 1945 },
            });
          }
        );
      }
    });
  }

  update() {
    const flag = this.cameras.main.centerX - this.player.x;
    const { left, right, up, down, space } = this.cursors;
    // 배경 벗어나지 않도록
    if (
      (flag > this.map.widthInPixels / 2 - 50 && left.isDown) ||
      (flag < -this.map.widthInPixels / 2 + 50 && right.isDown)
    ) {
      this.lastKeyPressTime = this.time.now;
      this.pet.setVelocityX(0);
      this.player.setVelocityX(0);
      this.player.stop();
    }
    // else{
    //   this.player.update(this.cursors)
    // }
    // 배경 안에서 움직일 수 있게
    if (
      (flag < this.map.widthInPixels / 2 - 50 && left.isDown) ||
      (flag > -this.map.widthInPixels / 2 + 50 && right.isDown)
    ) {
      this.lastKeyPressTime = this.time.now;
      this.player.update(this.cursors);
      this.pet.update(this.cursors);
    }
    if (space.isDown) {
      this.lastKeyPressTime = this.time.now;
      this.player.update(this.cursors);
      this.pet.update(this.cursors);
    }
    // keyboard 누르지 않을 때
    if (
      !left.isDown &&
      !right.isDown &&
      !up.isDown &&
      !down.isDown &&
      !space.isDown
    ) {
      this.pet.setVelocityX(0);
      this.player.setVelocityX(0);
      if (this.time.now - this.lastKeyPressTime >= 1000) this.pet.play("rest");
    }

    // this.npc.update();
  }
}
