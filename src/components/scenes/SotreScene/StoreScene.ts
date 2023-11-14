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
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: 'store' });
    }
    init(data: any) {
        this.playerType = data.playerType;
        this.value = data.hpBar;
    }
    create() {
        new Background(this, 0, 0, 'background');

        this.hpBar = new HealthBar(this, this.value);
        
        const x = this.cameras.main.centerX;
        const y = window.innerHeight;
        this.portal = new Portal(this, x + 300, y - 70, 'portal').setScale(0.7).setSize(120, 120);
        this.player = new Player(this, x + 100, y, 'player_' + this.playerType, 'stand1');
        this.pet = new Pet(this, x + 100, y, 'pet', 'stand1', this.player);
        this.pet.rest = true;

        this.cursors = this.input.keyboard!.createCursorKeys();

        const time = setInterval(() => {
            this.hpBar.increaseHP('redPotion');
            this.pet.play('rest');
        }, 10000);

        const fn = this.physics.add.overlap(this.portal, this.player, () => {
            fn.active = false;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            clearInterval(time);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('display', { player: this.playerType, hpBarValue: this.hpBar.value, bounding: { x: 5500, y: 1945 } });
            });
        });
    }

    update() {}
}
