export default class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'preloader' });
    }
    preload() {
        this.load.setBaseURL('assets');
        this.load.image('bg1', 'background/bg1.png');
        // this.load.atlas('player', 'player/poy/poy.png', 'player/poy/poy.json');
        // this.load.atlas('player', 'player/angel/angel.png', 'player/angel/angel.json');
        // this.load.atlas('player', 'player/marona/marona.png', 'player/marona/marona.json');
        this.load.atlas('player', 'player/witch/witch.png', 'player/witch/witch.json');

        // enemy
        this.load.atlas('mushroom', 'enemies/mushroom/mushroom.png', 'enemies/mushroom/mushroom.json');
        this.load.atlas('golem', 'enemies/golem/golem.png', 'enemies/golem/golem.json');
        this.load.atlas('pinkbean', 'enemies/pinkbean/pinkbean.png', 'enemies/pinkbean/pinkbean.json');
        this.load.atlas('gallopera', 'enemies/gallopera/gallopera.png', 'enemies/gallopera/gallopera.json');
        this.load.atlas('psycojack', 'enemies/psycojack/psycojack.png', 'enemies/psycojack/psycojack.json');

        //attack
        this.load.atlas('fireScratch', 'tools/fireScratch/fireScratch.png', 'tools/fireScratch/fireScratch.json');
        this.load.atlas('effect', 'tools/effect/effect.png', 'tools/effect/effect.json');
        this.load.atlas('beam', 'tools/beam/beam.png', 'tools/beam/beam.json');
        this.load.atlas('ice', 'tools/ice/ice.png', 'tools/ice/ice.json');
        this.load.atlas('star', 'tools/star/star.png', 'tools/star/star.json');
        this.load.atlas('scratch', 'tools/scratch/scratch.png', 'tools/scratch/scratch.json');
        this.load.atlas('fireBeam', 'tools/fireBeam/fireBeam.png', 'tools/fireBeam/fireBeam.json');
        this.load.atlas('fireLight', 'tools/fireLight/fireLight.png', 'tools/fireLight/fireLight.json');

        //pet
        this.load.atlas('pet', 'pet/pet.png', 'pet/pet.json');

        //tile
        this.load.image('platforms', 'map/texture.png');
        this.load.tilemapTiledJSON('map', 'map/map.json');

        //portal
        this.load.atlas('portal', 'portal/portal.png', 'portal/portal.json');

        //helpbar
        this.load.image('hpbar', 'healthBar/hpBar.png');

        //potion
        this.load.image('purplePotion', 'potion/purplePotion.png');
        this.load.image('redPotion', 'potion/redPotion.png');

        //sound
        this.load.audio('bgm', 'sounds/bgm.mp3');
        this.load.audio('fire', 'sounds/fire.mp3');
        this.load.audio('effect', 'sounds/effect.mp3');
        this.load.audio('beam', 'sounds/beam.mp3');
        this.load.audio('getPotion', 'sounds/getPotion.mp3');
    }
    create() {
        this.game.scene.start('display');
    }
}
