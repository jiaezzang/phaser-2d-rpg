import Attack from './Attack';

export default class Wind extends Attack {
    movingVelocity = 200;
    constructor(scene: Phaser.Scene, config: TAttackProps) {
        super(scene, config.x ?? 0, config.y ?? 0, 'wind', 'attack1');
        this.movingVelocity = config.flip ? -200 : +200;

        this.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('wind', {
                prefix: 'attack',
                start: 1,
                end: 8,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: 0
        });

        this.setVelocityX(this.movingVelocity);
    }

    playSound() {
        this.scene.sound.play('wind');
    }
}
