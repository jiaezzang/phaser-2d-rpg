import Attack from './Attack';

export default class Star extends Attack {
    movingVelocity = 200;
    constructor(scene: Phaser.Scene, config: TAttackProps) {
        super(scene, config.x ?? 0, config.y ?? 0, 'star', 'attack1');
        this.movingVelocity = config.flip ? -200 : +200;

        this.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('star', {
                prefix: 'attack',
                start: 1,
                end: 10,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: 0
        });

        this.setVelocityX(this.movingVelocity);
    }

    playSound() {
        this.scene.sound.play('effect');
    }
}
