import Attack from './Attack';

export default class Scratch extends Attack {
    constructor(scene: Phaser.Scene, config: TAttackProps) {
        super(scene, config.x ?? 0, config.y ?? 0, 'scratch', 'attack1');

        this.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('scratch', {
                prefix: 'attack',
                start: 1,
                end: 23,
                zeroPad: 1
            }),
            frameRate: 10,
            repeat: 0
        });
    }

    playSound() {
        this.scene.sound.play('fire');
    }
}
