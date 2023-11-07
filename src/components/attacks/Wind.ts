import { getCustomPropertyValueFromObject } from '../../util';
import Attack from './Attack';

export default class Wind extends Attack {
    min: number;
    max: number;
    movingVelocity = 100;
    constructor(scene: Phaser.Scene, config: Phaser.Types.Tilemaps.TiledObject) {
        super(scene, config.x ?? 0, config.y ?? 0, 'wind', 'attack1');
        this.min = getCustomPropertyValueFromObject(config, 'min');
        this.max = getCustomPropertyValueFromObject(config, 'max');
        this.movingVelocity = getCustomPropertyValueFromObject(config, 'velocity');
        this.anims.create({
            key: 'attack',
            frames: scene.anims.generateFrameNames('wind', {
                prefix: 'attack',
                start: 1,
                end: 8,
                zeroPad: 1
            }),
            frameRate: 8,
            repeat: -1
        });

        this.setOrigin(0, 1);
        this.play('attack');
        this.setVelocityX(-this.movingVelocity);
    }

    update(): void {
        // @ts-ignore
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
