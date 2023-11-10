import Pet from "../pet/Pet";

export default class PurplePotion extends Phaser.Physics.Arcade.Image {
    pet!: Pet;
    constructor(scene: Phaser.Scene, config:TPotionsProps, pet: Pet) {
        super(scene, config.x, config.y, config.texture);
        this.name = config.texture;
        this.pet = pet

        scene.add.existing(this);
        scene.physics.add.existing(this);

        //@ts-ignore
        this.body.setAllowGravity(false);
        this.setImmovable(true);
        this.setX(config.x).setY(config.y).setScale(1.5);
        this.setOrigin(0, 1);
    }

    update(...args: any[]): void {
        super.update(...args);
    }
}
