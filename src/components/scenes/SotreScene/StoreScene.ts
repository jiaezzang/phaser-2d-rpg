import Player from '../../Player';
import Pet from '../../pet/Pet';
import { Background } from './Background';

export default class StoreScene extends Phaser.Scene {
    player!: Player;
    playerType!: string;
    pet!: Pet;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor() {
        super({ key: 'store' });
    }
    init(data: any) {
        this.playerType = data.data;
        // this.player = data.data;
    }
    create() {
        new Background(this);
        this.player = new Player(this, 0, 1500, 'player_' + this.playerType, 'stand1');
        this.pet = new Pet(this, 0, 1500, 'pet', 'stand1', this.player);

        this.cursors = this.input.keyboard!.createCursorKeys();
    }
    update() {
        console.log(this.player);
        this.player.update(this.cursors);
        this.pet.update(this.cursors);
    }
}
