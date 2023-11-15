export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    flag: number;
    attacked: number;
    dead: boolean;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, flag: number) {
        super(scene, x, y, texture);
        this.name = texture;
        this.flag = flag;
        this.attacked = 0;
        this.dead = false;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        (this.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
        this.setImmovable(true);
    }
    async attack() {
        this.attacked += 1;
        this.setFrame('attack1');
        this.stop();
        this.setVelocity(0);
        await new Promise((r) => setTimeout(r, 1000));
        if (this.dead) return;
        this.play('walk');
        // @ts-ignore
        this.setVelocityX(this.flipX ? this.movingVelocity : -this.movingVelocity);
    }
    kill() {
        this.dead = true;
        this.setVelocity(0);
        return new Promise((resolve) => {
            this.play('dead').on('animationcomplete', () => {
                this.destroy();
                resolve('resolve');
            });
        });
    }
    update(...args: any[]): void {
        if (this.dead) return;
        super.update(...args);
    }
}
