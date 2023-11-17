# Phaser Project(231106~231116)  
Notion: **[https://notion/Phaser-Project-231106-231116](https://terrific-oviraptor-585.notion.site/Phaser-Project-231106-231116-d1bc290d4a934e27a3384b78f74d495c?pvs=4)**

## Thema : 2D RPG (Maple Stroy 모방)

![Untitled](https://cdn.ftoday.co.kr/news/photo/202309/308342_309298_1440.png)

- Player 선택
- Player가 이동할 수 있는 TileMap
- Player를 따라다니며 아이템을 줍는 Pet
- Player의 체력(HP) 그래프
- 몬스터 사냥 (Player마다 다른 공격 효과 부여)
- 사냥 성공 시 아이템 획득 (몬스터에 따라 다른 아이템 부여)
- 포션 아이템 획득 시 체력 증가
- 일정 시간동안 동작하지 않을 때 체력 증진

## Scenes

### SCENE0 : Player 선택

![Untitled](https://terrific-oviraptor-585.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0c7b1e2a-e47d-454b-9a0a-ac8af11b4573%2F286c4723-05c5-4443-87f1-12f3a6d41faf%2FUntitled.png?table=block&id=34aa2f3e-c384-4516-8de5-8838d36176b8&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&width=2000&userId=&cache=v2)

### SCENE1 : 사냥터

![Untitled](https://terrific-oviraptor-585.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0c7b1e2a-e47d-454b-9a0a-ac8af11b4573%2F3294f1b5-4308-40c7-8a04-bebffe319c5c%2FUntitled.png?table=block&id=ab680cdb-9cca-48f7-af20-3c1e234a3898&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&width=2000&userId=&cache=v2)

### SCENE2 : 쉼터

![Untitled](https://terrific-oviraptor-585.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0c7b1e2a-e47d-454b-9a0a-ac8af11b4573%2F9dcc0d2e-c58e-499f-8758-1cd54be106ca%2FUntitled.png?table=block&id=144f8920-225d-4229-994f-7ed4165bee64&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&width=2000&userId=&cache=v2)

## Development

- ## 🎞️ Scene 추가 및 이동

  ### Scene 추가

  ```jsx
  export default class DisplayScene extends Phaser.Scene {
    constructor() {
      super({ key: "display" });
      /*key 설정 및 Phaser.Scene의 생성자 호출*/
    }
    init() {
      /*Scene이 생성될 때 초기화*/
    }
    preload() {
      /*리소스 로드*/
    }
    create() {
      /*Scene 생성 후 초기화 담당 : 게임 객체 생성 및 초기상태 설정*/
    }
    update(): void {
      /*매 프레임마다 호출: 게임 상태 업데이트 로직 구현*/
    }
  }
  ```

  - Scene 파일 생성
  - `preload`는 하나의 파일로 묶어 생성하는 것이 편리

  ```jsx
  new Phaser.Game({
    // type: Phaser.WEBGL,
    width: "100%",
    height: "100%",
    physics: {
      default: "arcade",
      arcade: {
        debug: import.meta.env.DEV,
        gravity: { y: 2500 },
      },
    },
    scene: [Preloader, SelectPlayerScene, DisplayScene, StoreScene],
  });
  ```

  - main.ts에서 scene 속성에 넣고자 하는 scene들을 추가

  ```jsx
  this.game.scene.start("display");
  ```

  - 앞서 설정한 Scene의 고유 key값을 `start` 메서드에 넣으면 Scene이 실행

  ### Scene 전환

  ```jsx
  this.cameras.main.fadeOut(1000, 0, 0, 0);
  this.cameras.main.once(
    Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
    () => {
      this.scene.start("store", {
        playerType: this.playerType,
        hpBar: this.hpBar.value,
      });
    }
  );
  ```

  - 자연스러운 Scene 전환을 위해 Camera `fadout`
  - `fadeout`이 완료된 후(`Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLET`) Scene `start`

- ## 🛣️ Map(지형)

  ### Tilemap Edit

  ![Untitled](https://terrific-oviraptor-585.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0c7b1e2a-e47d-454b-9a0a-ac8af11b4573%2F361319a0-2ce1-4ca2-a3dc-b731fbf4dbfe%2FUntitled.png?table=block&id=9bbe732d-e768-431f-8fa8-000256a77772&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&width=2000&userId=&cache=v2)

  - [**Tiled Map Editor**](https://www.mapeditor.org/) 활용하여 TileMap 생성

  ![Untitled](https://terrific-oviraptor-585.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0c7b1e2a-e47d-454b-9a0a-ac8af11b4573%2F8b115c6d-7684-4f1c-91a9-6d7349dfbc34%2FUntitled.png?table=block&id=3e190c78-910e-41fa-a22d-e9a6f3972723&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&width=2000&userId=&cache=v2)

  - TileMap 생성 시 마찰을 가지게 될 영역을 지정해 bool type의 `Custom properties` 추가

  ![Untitled](https://terrific-oviraptor-585.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0c7b1e2a-e47d-454b-9a0a-ac8af11b4573%2Fb3bfab35-2d60-456c-8533-da889a0f6e1d%2FUntitled.png?table=block&id=56e1dc9e-c699-45e4-afec-f4dd7c68b8e4&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&width=2000&userId=&cache=v2)

  - 해당 Custom properties 찾고 rectangle 메서드를 활용해 위와 같은 사각형의 충돌 영역 설정

  ### Create Tilemap Layer

  ```jsx
  //1. map 생성
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("texture", "platforms") ?? "";
  const platforms = map.createLayer("platforms", tileset);
  platforms?.setCollisionByExclusion([-1]);
  if (platforms) this.platformsLayer = platforms;

  //2. add collides rect
  const platformGroup = this.physics.add.staticGroup();
  const tileBodies = this.platformsLayer
    .filterTiles((tile) => tile.properties.collides)
    .map((tile) => {
      return (
        this.add
          //resize한 비율에 맞게 tile사이즈 조정 필요
          .rectangle(tile.x * 40, tile.y * 40 + 160, 40, tile.properties.height)
          .setOrigin(0, 1)
      );
    });

  //3. collision false
  platformGroup.addMultiple(tileBodies);
  tileBodies.forEach((el) => {
    el.body.checkCollision.down = false;
    el.body.checkCollision.left = false;
    el.body.checkCollision.right = false;
  });
  this.physics.add.collider(platformGroup, this.player);
  ```

  - preload에서 설정한 map.json의 key를 사용해 tilemap을 만들고, 해당 Tilemap에 사용된 Tile의 이미지를 추가(`addTilesetImage`)한 후 이를 사용해 Layer를 생성(`createLayer`)
  - `addTilesetImage`의 첫번째 인자는 Tilemap Edit에서 설정했던 Tileset의 이름, 두번째 인자는 Layer의 이름
  - 해당 Layer에서 앞서 설정한 Custom properties 모두 찾아 rectangle 추가
  - 이렇게 그려진 사각형에 충돌 방식 설정
  - 이를 활용해 오브젝트마다 다르게 충범위 설정 가능(`checkCollision`)

  ![map.gif](https://file.notion.so/f/f/0c7b1e2a-e47d-454b-9a0a-ac8af11b4573/0a2a925f-fb13-40c1-84c5-539d65a9ec51/map.gif?id=e2bde296-01e3-4189-9899-610518b91f1a&table=block&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&expirationTimestamp=1700280000000&signature=OrHsN5pIGgAhgHZhptawRyn-AP4mvrSpXUuXeSNGAtc)

- ## 🧩 Sprite

  ### 스프라이트 이미지 생성

  ![스크린샷 2023-11-16 오후 1.53.01.png](https://terrific-oviraptor-585.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0c7b1e2a-e47d-454b-9a0a-ac8af11b4573%2F2d5a1d49-f61a-48e4-972a-064ce386540c%2F%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-11-16_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_1.53.01.png?table=block&id=1417ce46-30f6-4ec9-8208-90837ee80575&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&width=2000&userId=&cache=v2)

  ![스크린샷 2023-11-16 오후 3.34.15.png](https://terrific-oviraptor-585.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F0c7b1e2a-e47d-454b-9a0a-ac8af11b4573%2Fb36682b9-8349-4178-b8e8-57037e3267a5%2F%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2023-11-16_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%2592%25E1%2585%25AE_3.34.15.png?table=block&id=ff4b18a4-ccc7-45ca-b800-9ca3e12a0bfe&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&width=2000&userId=&cache=v2)

  - 스프라이트 이미지 만들기
  - texture packer를 통해 스프라이트 이미지를 json 파일로 생성
  - 각 이미지의 이름은 동작에 맞게 설정해야 함 (stand, walk, attack 등)

  ### json 파일

  ```json
  {
      "frames": {
          "dead1": {
              "frame": { "x": 0, "y": 0, "w": 320, "h": 161 },
              "rotated": false,
              "trimmed": true,
              "spriteSourceSize": { "x": 14, "y": 63, "w": 320, "h": 161 },
              "sourceSize": { "w": 346, "h": 230 },
              "pivot": { "x": 0.5, "y": 0.5 }
          },
          "dead2": {
              ...
          },
          "walk1": {
              ...
          },
          "walk2": {
              ...
          },
      },
      "meta": {
          "app": "http://free-tex-packer.com",
          "version": "0.6.7",
          "image": "balrog",
          "format": "RGBA8888",
          "size": {
              "w": 2004,
              "h": 607
          },
          "scale": 1
      }
  }
  ```

  - Sprite json 파일 생성

  ### 스프라이트 생성 및 실행

  ```tsx
  this.anims.create({
    key: "walk",
    frames: scene.anims.generateFrameNames("balrog", {
      prefix: "walk",
      start: 1,
      end: 8,
    }),
    repeat: -1,
  });

  this.play("walk");
  ```

  - json 파일에 등록한 동작의 수 만큼 `end` 값 설정
  - `repeat` 을 통해 무한 반복
  - 각 몬스터의 이름을 frame의 이름으로 등록, key 값은 json 파일에 있는 동작의 이름과 연결

  ![화면-기록-2023-11-16-오후-3.59.51.gif](https://file.notion.so/f/f/0c7b1e2a-e47d-454b-9a0a-ac8af11b4573/77dc667b-2173-433a-8289-c2c836d6e9b0/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB-%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8-2023-11-16-%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE-3.59.51.gif?id=4cfcd35e-99c3-49c3-9cd3-4e1d5378f12b&table=block&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&expirationTimestamp=1700280000000&signature=tB-_x_F_uLGXouagCvlvW5IAqW6RM0a9Yp1oNbkXY-8)

- ## 💊 Health Bar

  ### Phaser.GameObjects.Graphics

  ```jsx
  const hpBar = new Phaser.GameObjects.Graphics(scene);
  hpBar.fillRect(this.x - 82 + 2, this.y + 3, vlaue, 23);
  hpBar.fillStyle(0xf5000a);
  ```

  - Graphics객체는 주로 동적인 그래픽 요소를 그릴 때 사용
  - 런타임동안 계속 업데이트 됨

  ### 자연스러운 HP증가

  ```jsx
  this.tweens.add({
    targets: box,
    duration: 2000, // 지속 시간
    ease: "Linear", // 효과
    repeat: -1, // 반복 여부
    yoyo: true, // 왕복 여부
  });
  ```

  - tweens 클래스는 게임 객체의 속성을 일정 시간동안 부드럽게 변경할 수 있도록 함

  ```jsx
  if (this.updateTween && this.updateTween.isPlaying()) {
    this.updateTween.on("complete", () => {
      this.currentHp = this.newHp;
      this.newHp += this.hp;
      this.updateTween = this.scene.tweens.addCounter({
        from: this.value,
        to: this.value + this.hp,
        duration: 500,
        ease: "linear",
        onUpdate: (tween) => {
          this.value = Math.round(tween.getValue());
          if (this.value >= 473) this.value = 473;
          this.draw();
        },
      });
    });
  } else {
    this.updateTween = this.scene.tweens.addCounter({
      from: this.value,
      to: this.value + this.hp,
      duration: 500,
      ease: "linear",
      onUpdate: (tween) => {
        this.value = Math.round(tween.getValue());
        if (this.value >= 473) this.value = 473;
        this.draw();
      },
    });
  }
  ```

  - addCounter: 특정 값의 시작과 종료 사이의 값을 쉽게 변화시킬 수 있는 카운터를 만듦
  - 이전의 tweens Animation이 끝나지 않았다면 해당 Animation이 끝날 때 까지 기다렸다가 누적하여 실행하도록 처리

  ### tweens 적용 예시

  ![Animation2.gif](https://file.notion.so/f/f/0c7b1e2a-e47d-454b-9a0a-ac8af11b4573/5fa32f66-5498-4527-b3f0-32966c9eced6/Animation2.gif?id=6930e435-708d-4f1a-9a7b-3ce02bce3295&table=block&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&expirationTimestamp=1700280000000&signature=OgEHc7YNcijYf7cbj96x8X4GagTjOhwKYJfHpBHOBnw)
  ![Animation1.gif](https://file.notion.so/f/f/0c7b1e2a-e47d-454b-9a0a-ac8af11b4573/1ac29a1b-51bc-409c-b896-d657ba585e6d/Animation1.gif?id=c90258bf-c35e-4e3b-870f-00be3cb1de5c&table=block&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&expirationTimestamp=1700280000000&signature=g_PJDsoT6pjhUZtFFOyX1ZPUZPUR8s24T7lQuzbzujM)
  _참고 예제 : [https://phaser.io/examples/v3/view/tweens/counter-tween,](https://phaser.io/examples/v3/view/tweens/counter-tween) [https://labs.phaser.io/edit.html?src=src/game objects/graphics/health bars demo.js&v=3.60.0](https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo)_

- ## 🧚 Player

  ### 기획

  📌 3개의 Player 중 하나를 선택하여 게임 실행

  📌 서기, 걷기, 점프, 공격 동작 구현

  📌 Camera는 Player에 초점

  📌 다른 객체들과의 상호작용(Portal, Monster)

  ### 개발

  1. **3개의 Player 중 하나를 선택하여 게임 실행**

  ![selectPlayer.gif](https://file.notion.so/f/f/0c7b1e2a-e47d-454b-9a0a-ac8af11b4573/7f78f34b-acc0-4d44-b4a4-90a528eb41a2/selectPlayer.gif?id=ddd12d74-720b-4239-92ee-8740c2a9c885&table=block&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&expirationTimestamp=1700280000000&signature=dOW2bc-cplZMsOpptzy9n4_8mHuJhP7g9xhRtOVIOeE)

  ```jsx
  sprite.setInteractive({ draggable: false, cursor: "pointer" });
  sprite.on("pointerover", () => {
    el.setTint();
    el.play(animationType, true);
  });
  ```

  - `setInteractive` : pointer 이벤트를 주기 위해 Sprite 이미지에 `setInteractive` 설정

  2. **서기, 걷기, 점프, 공격 동작 구현**

  ```jsx
  //LR, Stand
  if (cursors.left.isDown) {
    this.setVelocityX(-400);
    this.setFlipX(true);
    if (this.body?.blocked.down && !this._attack) this.play("walk", true);
  } else if (cursors.right.isDown) {
    this.setVelocityX(400);
    this.setFlipX(false);
    if (this.body?.blocked.down && !this._attack) this.play("walk", true);
  } else {
    this.setVelocityX(0);
    if (this.body?.blocked.down && !this._attack) this.play("stand");
    if (!this.dead && this.attacked) this.setFrame("hit1");
  }

  //Jump
  if (cursors.space.isDown && this.body?.blocked.down) {
    this.jump();
    this.setVelocityY(-1250);
  }
  ```

  - 키보드 조작과 데미지 여부에 따른 Animaition 부여

  3. **Camera는 Player에 초점**

  ```jsx
  this.cameras.main.startFollow(this.player);
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  ```

  - `camera(Phaser.Cameras.Scene2D.CameraManager)`: 게임 화면에 대한 뷰포트 (플레이어의 시야)
  - `startFollow`로 초점 대상을 지정하고, `setBounds`로 가동 범위를 조절

  4. **다른 객체들과의 상호작용(Portal, Monster)**

  ```jsx
  this.physics.add.overlap(this.player, this.enemies, () => {
    this.player.kill(this.hpBar.value);
    this.hpBar.decreaseHp(2);
  });
  ```

  - `this.physics.add.overlap` 사용해 두 오브젝트가 겹쳤을 때의 이벤트를 설정

- ## 🐈 Pet

  ### 기획

        📌 항상 Player 뒤에 따라다닐 것
        📌 일정 거리 내의 아이템을 스스로 획득할 것
        📌 일정 거리 이상 멀어질 때 소환될 것

  ### **개발**

  1. **항상 Player 뒤에 따라다닐 것**

  ```jsx
  //gap : player와 pet 사이의 거리
  const gap = {
      x: Math.abs(this.target.body.position.x - this.body?.position.x!),
      y: Math.abs(this.target.body.position.y - this.body?.position.y!)
  };

  //gapX : Player와 Pet 중 어느 것이 오른쪽에 있는지 확인
  const gapX = this.target.body.position.x - this.body?.position.x!;
  ```

  - Player와 Pet 사이의 거리와 위치 확인하기
  - Pet과 Player간의 거리를 조정하고 Pet이 Player보다 앞서가지 않도록 하기 위함

  ```jsx
  if (cursors.left.isDown) {
    this.setFlipX(false);
    if (gapX < 0 && this.body?.blocked.down && gap.x > this.minLine) {
      this.play("walk", true);
      this.setVelocityX(this.target.body.velocity.x);
    }
  } else if (cursors.right.isDown) {
    this.setFlipX(true);
    if (gapX > 0 && this.body?.blocked.down && gap.x > this.minLine) {
      this.play("walk", true);
      this.setVelocityX(this.target.body.velocity.x);
    }
  } else {
    if (gap.x > this.minLine && gap.x <= this.deadLine) {
      if (gapX < 0) this.setVelocityX(-400);
      else if (gapX > 0) this.setVelocityX(400);
      this.play("walk", true);
    } else {
      this.setVelocityX(0);
      this.play("stand", true);
    }
  }
  ```

  - 좌키(←)를 눌렀을 때 : Pet이 Player보다 오른쪽에 있을 때만 동작
  - 우키(→)를 눌렀을 때 : Pet이 Player보다 왼쪽에 있을 때만 동작
  - 좌우키를 누르지 않았을 때 : 최대 거리(deadLine)안에 있지만 최소 거리(minLine)보다 멀어졌을 때 키보드를 입력하지 않아도 Pet이 Player에게 스스로 걸어올 수 있도록 처리
  - 따라서 아이템을 획득했을 때에 다시 Player에게 돌아오도록 할 수 있음

  2. **일정 거리 내의 아이템을 스스로 획득할 것**

  ```jsx
  if (
    Math.abs(this.pet.x - child.x) < 300 &&
    Math.abs(this.pet.y - child.y) < 300
  ) {
    this.physics.moveToObject(this.pet, potion, 500);
  }
  ```

  - `moveToObject` : 특정 게임 객체가 다른 게임 객체나 좌표로 이동할 수 있게 도와주는 메서드
  - 목적지까지 선형 이동하는 방식으로 중력 법칙을 반영하지 않음 (Pet의 조작에는 부적합)

  3. **일정 거리 이상 멀어질 때 소환될 것**

  ```jsx
  if (gap.x > this.deadLine || gap.y > this.deadLine) {
    setTimeout(() => {
      this.x = this.target.x;
      this.y = this.target.y;
    }, 800);
  }
  ```

- ## ⚔️ 공격

  ### 기획

  📌 캐릭터 별로 다른 공격 스킬 사용 (총 9개의 공격)  
  📌 몬스터를 한마리씩 공격하는 스킬과 여러마리를 한번에 공격하는 스킬 구현  
  📌 몬스터가 죽은 뒤에 포션 생성  
  📌 죽은 몬스터 자리에 똑같은 타입의 몬스터 생성

  ### 공격 생성 및 실행

  ```tsx
  keydown(key: string) {
      const x = this.player.flipX ? this.player.x - 50 : this.player.x + 100;
      const props = { x: x, y: this.player.y, flip: this.player.flipX };

      if (['keyZ', 'keyX'].includes(key)) {
          this.attack = createAttack(this, props, key, this.playerType);
          this.kill(this.enemies);
      }else if (key === 'keyC') {
          const monsters = this.enemies.getChildren().filter((child) =>
  						Phaser.Math.Distance.Between(this.player.x, this.player.y, child.x, child.y) <= 1000);

  				monsters.forEach((monster) => {
              const props = { x: monster.x, y: monster.y };
              this.attack = createAttack(this, props, key, this.playerType);
              this.kill(monster);
          });
      }
  }
  ```

  - Z, X, C key를 누르면 캐릭터에 맞는 공격 생성
  - 기본 공격 (Z, X) 은 플레이어의 좌표를 기준으로 공격이 수평으로 진행
  - C key는 플레이어와 가까이 있는 여러 몬스터를 공격할 수 있는 특별한 스킬
  - `Phaser.Math.Distance.Between` 을 사용해서 플레이어와 맵에 있는 모든 몬스터의 거리 계산
  - 몬스터의 좌표를 기준으로 공격 생성

  ![화면-기록-2023-11-16-오후-4.36.22.gif](https://file.notion.so/f/f/0c7b1e2a-e47d-454b-9a0a-ac8af11b4573/ff903a80-6e67-450d-8f58-681c2b4123e1/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB-%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8-2023-11-16-%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE-4.36.22.gif?id=96fc6678-1f6a-456f-90ae-54b9138fa6b9&table=block&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&expirationTimestamp=1700280000000&signature=BSUtywPBx6xH9YioMUM_OxN_XgdruZZEcJUF4wmeG88)

  ### 포션, 죽은 몬스터 생성

  ```tsx
  kill(enemies: Phaser.Types.Physics.Arcade.ArcadeColliderType) {
      const fn = this.physics.add.overlap(enemies, this.attack, async (monster) => {
          fn.active = false;
          if (monster.attacked < monster.flag) monster.attack();
          else {
              this.enemies.remove(monster);

  			      monster.kill()

  		        const { name, x, y, flag, min, max } = monster;
  		        this.addPotion(x, y, name);

  		        await new Promise((r) => setTimeout(r, 4000));
  		        this.addEnemy({
  								type: name,
  								x: x,
  								y: y,
  								dead: flag,
  								properties: {
  									min: min,
  									max: max
  								}
  		        });
          }
      });
      this.attack.attack();
  }
  ```

  - `this.physics.add.overlap()` 을 통해 공격과 몬스터가 겹치면 공격 로직 수행
  - 몬스터가 죽는 기준점을 넘지 않았으면 `attack()` 실행하여 공격받은 횟수 1씩 증가
  - 가장 가까운 몬스터 한마리만 공격할 수 있도록 충돌 시 함수의 `active` 를 `false` 로 정의
  - 기준점을 넘으면 `enemise group` 에서 죽은 몬스터를 제거하고, `kill()` 실행
  - dead 애니메이션이 끝나면 몬스터 제거
  - 죽은 몬스터의 좌표를 기준으로 포션과 새로운 몬스터 객체 생성
  - 몬스터에 따라 포션 타입 다르게 생성

  ```tsx
  // Enemy.ts

  kill() {
  		...
      return new Promise((resolve) => {
          this.play('dead').on('animationcomplete', () => {
              this.destroy();
              resolve();
          });
      });
  }
  ```

  - `animationcomplete` 를 통해 애니메이션이 끝난 후 몬스터 제거

  ![화면-기록-2023-11-16-오후-4.19.04.gif](https://file.notion.so/f/f/0c7b1e2a-e47d-454b-9a0a-ac8af11b4573/5ec1c2ad-654d-4d80-8da3-e629f9694958/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB-%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8-2023-11-16-%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE-4.19.04.gif?id=8aefc16f-1477-4aa0-8571-2d5a2b1ffe66&table=block&spaceId=0c7b1e2a-e47d-454b-9a0a-ac8af11b4573&expirationTimestamp=1700280000000&signature=yBH56xe32WGRxkyM4hZsOkSImKHmE8oZ2Fxh3lwOBNo)

- ## 👻Monster

  ### 기획

  📌 `Phaser.GameObjects.Group` 을 통해 몬스터들을 그룹으로 관리  
   📌 몬스터들끼리 공통으로 사용되는 메서드는 `enemy` 클래스에서 사용  
   📌 몬스터 별로 다른 능력치 부여

  ### 몬스터 생성

  ```tsx
  // EnemyGroup.ts

  import Mushroom from "./Mushroom";
  import Gallopera from "./Gallopera";
  import Golem from "./Golem";
  import PinkBean from "./PinkBean";
  import PsycoJack from "./PsycoJack";
  import Balrog from "./Balrog";

  export default class EnemiseGroup extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene, enemies: TEnimiesProps[]) {
      super(scene);
      enemies.forEach((config) => {
        const enemy = this.enemy(config);
        if (enemy) this.add(enemy);
      });
    }
    update(): void {
      this.children.each((enemy) => enemy.update());
    }
    insert(config: TEnimiesProps) {
      const enemy = this.enemy(config);
      return enemy;
    }
    enemy(config: TEnimiesProps) {
      const { type, x, y, dead, properties } = config;
      const props = { x: x, y: y, flag: dead, properties: properties };
      if (type === "pinkbean") {
        return new PinkBean(this.scene, props);
      } else if (type === "mushroom") {
        return new Mushroom(this.scene, props);
      } else if (type === "golem") {
        return new Golem(this.scene, props);
      } else if (type === "psycojack") {
        return new PsycoJack(this.scene, props);
      } else if (type === "gallopera") {
        return new Gallopera(this.scene, props);
      } else if (type === "balrog") {
        return new Balrog(this.scene, props);
      }
    }
  }
  ```

  - 미리 정의한 `enemies` 데이터들을 반복문을 통해 생성하며 `EnemiseGroup` 에 추가
  - 몬스터의 타입, 생성할 좌표, 이동할 수 있는 위치의 최소, 최대값, 몬스터를 죽일 수 있는 값 등을 필수로 전달
  - 몬스터가 죽은 뒤에 새로운 몬스터를 추가할 때는 `insert()` 를 통해 추가

  ### 몬스터 컴포넌트

  ```tsx
  // Enemy.ts

  export default class Enemy extends Phaser.Physics.Arcade.Sprite {
      constructor(scene: Phaser.Scene, x: number, y: number, texture: string, flag: number) {
          ...
      }
      async attack() {
          this.attacked += 1;
          this.setFrame('attack1');
          this.stop();
          this.setVelocity(0);
          await new Promise((r) => setTimeout(r, 1000));
          if (this.dead) return;
          this.play('walk');
          this.setVelocityX(this.flipX ? this.movingVelocity : -this.movingVelocity);
      }
      kill() {
          this.dead = true;
          this.setVelocity(0);
          return new Promise((resolve) => {
              this.play('dead').on('animationcomplete', () => {
                  this.destroy();
                  resolve();
              });
          });
      }
  }
  ```

  - 몬스터에서 사용되는 공통 메서드 정의
  - 몬스터가 공격을 받을 때 마다 `attack()` 실행, `attacked` 의 횟수 1씩 증가
  - `attack1` 프레임을 실행하고, 1초 뒤에 몬스터들을 다시 걷게 함
  - 몬스터를 죽일 수 있는 횟수가 되면 `kill()` 실행, dead 애니메이션 실행
  - 애니메이션이 완료되면 해당 몬스터 객체 삭제

  ```tsx
  // Mushroom.ts

  import Enemy from "./Enemy";

  export default class Mushroom extends Enemy {
    constructor(scene: Phaser.Scene, config: TEnemyProps) {
      super(scene, config.x ?? 0, config.y ?? 0, "mushroom", config.flag);

      this.anims.create({
        key: "walk",
        frames: scene.anims.generateFrameNames("mushroom", {
          prefix: "walk",
          start: 1,
          end: 5,
        }),
        frameRate: 8,
        repeat: -1,
      });
      this.anims.create({
        key: "dead",
        frames: scene.anims.generateFrameNames("mushroom", {
          prefix: "dead",
          start: 1,
          end: 4,
        }),
        frameRate: 8,
        repeat: 0,
      });

      this.setOrigin(0, 1);
      this.play("walk");
      this.setVelocityX(-this.movingVelocity);
    }

    update(): void {
      if ((this.body as Phaser.Physics.Arcade.Body).x < this.min) {
        this.setFlipX(true);
        this.setVelocityX(this.movingVelocity);
      } else if (
        (this.body as Phaser.Physics.Arcade.Body).x +
          (this.body as Phaser.Physics.Arcade.Body).width >
        this.max
      ) {
        this.setFlipX(false);
        this.setVelocityX(-this.movingVelocity);
      }
    }
  }
  ```

  - 몬스터의 Sprite Animation 생성
  - 몬스터의 타입에 따라 `setVelocityX` , `setVelocityY` 조절
  - `update()` 함수를 통해 몬스터가 타일을 벗어나지 않게 체크
