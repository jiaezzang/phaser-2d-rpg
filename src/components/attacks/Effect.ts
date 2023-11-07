import { getCustomPropertyValueFromObject } from '../../util';
import Attack from './Attack';

export default class Effect extends Attack {
    min: number;
    max: number;
    movingVelocity = 100;
    constructor(scene: Phaser.Scene, config: Phaser.Types.Tilemaps.TiledObject) {
        super(scene, config.x ?? 0, config.y ?? 0, 'effect', 'attack1');
        this.min = getCustomPropertyValueFromObject(config, 'min');
        this.max = getCustomPropertyValueFromObject(config, 'max');
        this.movingVelocity = getCustomPropertyValueFromObject(config, 'velocity');
        this.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('effect', {
                prefix: 'attack',
                start: 1,
                end: 4,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });

        this.setOrigin(0, 1);
        this.play('attack');
        this.setVelocityY(-this.movingVelocity);
    }

    update(): void {
        if (this.y < this.min) {
            this.setVelocityY(this.movingVelocity);
        } else if (this.y + this.height > this.max) {
            this.setVelocityY(-this.movingVelocity);
        }
    }
}
