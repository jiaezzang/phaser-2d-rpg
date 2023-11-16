export default class SelectPlayerScene extends Phaser.Scene {
    hover!: string;
    players!: Phaser.GameObjects.Sprite[];
    constructor() {
        super({ key: 'selectPlayer' });
        console.log('Select Player');
    }
    create() {
        this.sound.play('scene0', { loop: true });
        this.input.setDefaultCursor('url(assets/cursor/default1.png), pointer');
        this.add.image(window.innerWidth / 2, window.innerHeight / 2 - 200, 'selectPlayer').setScale(2);
        this.physics.destroy();
        this.hover = '';
        this.players = [];

        const angel = this.player(window.innerWidth / 2 - 270, window.innerHeight / 2, 'angel');
        const marona = this.player(window.innerWidth / 2, window.innerHeight / 2, 'marona');
        const witch = this.player(window.innerWidth / 2 + 250, window.innerHeight / 2, 'witch');
        this.players.push(angel, marona, witch);
        this.players.forEach((el) => {
            el.on('pointerover', () => {
                this.input.setDefaultCursor('url(assets/cursor/default.png), pointer');
                el.setTint();
                el.play('walk_' + el.texture.key.replace('player_', ''), true);
            }).on('pointerout', () => {
                el.stop();
                el.setFrame('stand1');
                el.setTint(0x808080);
            });
            el.on('pointerup', () => {
                this.input.setDefaultCursor('url(assets/cursor/default.png), pointer');
                this.sound.stopAll();
                this.scene.start('display', { player: el.texture.key.replace('player_', '') });
            });
            el.on('pointerdown', () => {
                this.input.setDefaultCursor('url(assets/cursor/mouseDown.png), pointer');
            });
        });
    }
    player(x: number, y: number, choice: string) {
        this.anims.create({
            key: 'stand_' + choice,
            frames: this.anims.generateFrameNames('player_' + choice, {
                prefix: 'stand',
                start: 1,
                end: 5,
                zeroPad: 1
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'walk_' + choice,
            frames: this.anims.generateFrameNames('player_' + choice, {
                prefix: 'walk',
                start: 1,
                end: 6,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });
        const sprite = this.add.sprite(x, y, 'player_' + choice);
        sprite.setOrigin(0.5, 1);
        sprite.setFrame('stand1');
        sprite.setTint(0x808080);
        sprite.setInteractive({ draggable: false, cursor: 'pointer' });

        return sprite;
    }
}
