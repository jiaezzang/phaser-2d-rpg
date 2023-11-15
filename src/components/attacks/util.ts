import Beam from './Beam';
import IceScratch from './IceScratch';
import FireBeam from './FireBeam';
import FireLight from './FireLignt';
import FireScratch from './FireScratch';
import Magician from './Magician';
import Scratch from './Scratch';
import Star from './Star';
import Ice from './Ice';

export type TAttack = Beam | IceScratch | FireBeam | FireLight | FireScratch | Ice | Magician | Scratch | Star;
export const createAttack = (scene: Phaser.Scene, props: TAttackProps, key: string, playerType: string) => {
    if (playerType === 'angel') {
        if (key === 'keyZ') return new Beam(scene, props);
        else if (key === 'keyX') return new Ice(scene, props);
        else if (key === 'keyC') return new Scratch(scene, props);
    } else if (playerType === 'marona') {
        if (key === 'keyZ') return new FireLight(scene, props);
        else if (key === 'keyX') return new IceScratch(scene, props);
        else if (key === 'keyC') return new FireScratch(scene, props);
    } else if (playerType === 'witch') {
        if (key === 'keyZ') return new FireBeam(scene, props);
        else if (key === 'keyX') return new Star(scene, props);
        else if (key === 'keyC') return new Magician(scene, props);
    }
};
