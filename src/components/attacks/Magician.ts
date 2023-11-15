import Attack from './Attack';

export default class Magician extends Attack {
    constructor(scene: Phaser.Scene, config: TAttackProps) {
        super(scene, config.x ?? 0, config.y ?? 0, 'scratch', 'attack1');

        this.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('magician', {
                prefix: 'attack',
                start: 1,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 10,
            repeat: 0
        });
    }

    playSound() {
        this.scene.sound.play('effect');
    }
}
