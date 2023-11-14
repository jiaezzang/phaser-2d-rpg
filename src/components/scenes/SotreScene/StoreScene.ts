import Player from '../../Player';
import Pet from '../../pet/Pet';
import { Background } from './Background';
import HealthBar from '../../healthBar/HealthBar';
import Portal from '../../portal/Portal';

export default class StoreScene extends Phaser.Scene {
    player!: Player;
    playerType!: string;
    pet!: Pet;
    hpBar!: HealthBar;
    value!: number;
    portal!: Portal;
    timeKey!: number;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: 'store' });
    }
    init(data: { playerType: string; hpBar: number }) {
        this.playerType = data.playerType;
        this.value = data.hpBar;
    }
    create() {
        this.sound.play('scene2', { loop: true });
        new Background(this, 0, 0, 'background');
        this.timeKey = 0;
        this.hpBar = new HealthBar(this, this.value);

        const x = this.cameras.main.centerX;
        const y = window.innerHeight;
        this.portal = new Portal(this, x + 300, y - 70, 'portal').setScale(0.7).setSize(120, 120);
        this.player = new Player(this, x + 100, y, 'player_' + this.playerType, 'stand1');
        this.pet = new Pet(this, x + 100, y, 'pet', 'stand1', this.player);
        this.pet.play('rest');

        this.cursors = this.input.keyboard!.createCursorKeys();

        this.timeKey = setInterval(() => {
            this.hpBar.increaseHP('redPotion');
        }, 10000);

        const fn = this.physics.add.overlap(this.portal, this.player, () => {
            fn.active = false;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            clearInterval(this.timeKey);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.sound.stopAll();
                this.sound.play('portal');
                this.scene.start('display', { player: this.playerType, hpBarValue: this.hpBar.value, bounding: { x: 5500, y: 1945 } });
            });
        });
    }

    update() {
        const flag = this.cameras.main.centerX - this.player.x;
        const { left, right, up, down } = this.cursors;
        // 배경 벗어나지 않도록
        if ((flag > 370 && left.isDown) || (flag < -370 && right.isDown)) {
            this.player.setVelocityX(0);
            this.pet.setVelocityX(0);
        }
        // 배경 안에서 움직일 수 있게
        if ((flag < 370 && left.isDown) || (flag > -370 && right.isDown)) {
            this.player.update(this.cursors);
            this.pet.update(this.cursors);
        }
        // keyboard 누르지 않을 때
        if (!left.isDown && !right.isDown && !up.isDown && !down.isDown) {
            this.pet.setVelocityX(0);
            this.pet.play('rest');
            this.player.update(this.cursors);
        }
    }
}
