import { getCustomPropertyValueFromObject } from '../util';
import Enemy from './Enemy';

export default class BirdEnemy extends Enemy {
    min: number;
    max: number;
    movingVelocity = 100;
    constructor(scene: Phaser.Scene, config: Phaser.Types.Tilemaps.TiledObject) {
        super(scene, config.x ?? 0, config.y ?? 0, 'bird', 'walk1');
        console.log(config);
        this.min = getCustomPropertyValueFromObject(config, 'min');
        this.max = getCustomPropertyValueFromObject(config, 'max');
        this.movingVelocity = getCustomPropertyValueFromObject(config, 'velocity');
        this.anims.create({
            key: 'walk',
            frames: scene.anims.generateFrameNames('bird', {
                prefix: 'walk',
                start: 1,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });

        this.setOrigin(0, 1);
        this.play('walk');
        this.setVelocityY(-this.movingVelocity);
    }

    update(): void {
        if (this.dead) return;
        if (this.y < this.min) {
            this.setVelocityY(this.movingVelocity);
        } else if (this.y + this.height > this.max) {
            this.setVelocityY(-this.movingVelocity);
        }
    }
}
