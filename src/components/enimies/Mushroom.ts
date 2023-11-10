import Enemy from './Enemy';

type TMushroomProps = {
    x: number;
    y: number;
    flag: number;
    properties: { min: number; max: number };
};
export default class Mushroom extends Enemy {
    min: number;
    max: number;
    movingVelocity = 100;
    constructor(scene: Phaser.Scene, config: TMushroomProps) {
        super(scene, config.x ?? 0, config.y ?? 0, 'mushroom', config.flag, 'walk1');
        this.min = config.properties.min;
        this.max = config.properties.max;

        this.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNames('mushroom', {
                prefix: 'walk',
                start: 1,
                end: 5,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'dead',
            frames: scene.anims.generateFrameNames('mushroom', {
                prefix: 'dead',
                start: 1,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: 0
        });

        this.setOrigin(0, 1);
        this.play('walk');
        this.setVelocityX(-this.movingVelocity);
    }

    update(): void {
        if (this.dead) return;
        //@ts-ignore
        if (this.body.x < this.min) {
            this.setFlipX(true);
            this.setVelocityX(this.movingVelocity);
            // @ts-ignore
        } else if (this.body.x + this.body.width > this.max) {
            this.setFlipX(false);
            this.setVelocityX(-this.movingVelocity);
        }
    }
}
