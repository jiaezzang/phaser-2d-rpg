import Attack from './Attack';

export default class Effect extends Attack {
    movingVelocity = 200;
    constructor(scene: Phaser.Scene, config: TAttackProps) {
        super(scene, config.x ?? 0, config.y ?? 0, 'effect', 'attack1');

        this.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('effect', {
                prefix: 'attack',
                start: 1,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: 2
        });

        this.setVelocityY(this.movingVelocity);
    }

    playSound() {
        this.scene.sound.play('effect');
    }
}
