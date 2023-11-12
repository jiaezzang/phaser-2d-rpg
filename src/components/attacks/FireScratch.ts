import Attack from './Attack';

export default class FireScratch extends Attack {
    constructor(scene: Phaser.Scene, config: TAttackProps) {
        super(scene, config.x ?? 0, config.y ?? 0, 'fireScratch', 'attack1');

        this.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('fireScratch', {
                prefix: 'attack',
                start: 1,
                end: 11,
                zeroPad: 1
            }),
            frameRate: 10,
            repeat: 1
        });
    }

    playSound() {
        this.scene.sound.play('fire');
    }
}
