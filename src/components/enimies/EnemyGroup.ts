import Mushroom from './Mushroom';
import Gallopera from './Gallopera';
import Golem from './Golem';
import PinkBean from './PinkBean';
import PsycoJack from './PsycoJack';

type TEnemyProps = { type: string; x: number; y: number; dead: number; properties: { min: number; max: number } };
export default class EnemiseGroup extends Phaser.GameObjects.Group {
    constructor(scene: Phaser.Scene, enemies: TEnemyProps[]) {
        super(scene);
        enemies.forEach((config) => {
            const enemy = this.enemy(config);
            if (enemy) this.add(enemy);
        });
    }
    update(): void {
        this.children.each((enemy) => (enemy as any).update());
    }
    insert(config: TEnemyProps) {
        const enemy = this.enemy(config);
        return enemy;
    }
    enemy(config: TEnemyProps) {
        const { type, x, y, dead, properties } = config;
        const props = { x: x, y: y, flag: dead, properties: properties };
        if (type === 'pinkbean') {
            return new PinkBean(this.scene, props);
        } else if (type === 'mushroom') {
            return new Mushroom(this.scene, props);
        } else if (type === 'golem') {
            return new Golem(this.scene, props);
        } else if (type === 'psycojack') {
            return new PsycoJack(this.scene, props);
        } else if (type === 'gallopera') {
            return new Gallopera(this.scene, props);
        }
    }
}
