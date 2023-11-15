export default class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'preloader' });
    }
    preload() {
        this.load.setBaseURL('assets');
        this.load.image('bg1', 'background/bg1.png');
        this.load.image('bg2', 'background/bg2.png');
        this.load.image('selectPlayer', 'selectPlayer/select.png');
        this.load.atlas('player', 'player/poy/poy.png', 'player/poy/poy.json');
        this.load.atlas('player_angel', 'player/angel/angel.png', 'player/angel/angel.json');
        this.load.atlas('player_marona', 'player/marona/marona.png', 'player/marona/marona.json');
        this.load.atlas('player_witch', 'player/witch/witch.png', 'player/witch/witch.json');
        this.load.image('default1', 'cursor/default1.png');

        // enemy
        this.load.atlas('mushroom', 'enemies/mushroom/mushroom.png', 'enemies/mushroom/mushroom.json');
        this.load.atlas('golem', 'enemies/golem/golem.png', 'enemies/golem/golem.json');
        this.load.atlas('pinkbean', 'enemies/pinkbean/pinkbean.png', 'enemies/pinkbean/pinkbean.json');
        this.load.atlas('gallopera', 'enemies/gallopera/gallopera.png', 'enemies/gallopera/gallopera.json');
        this.load.atlas('psycojack', 'enemies/psycojack/psycojack.png', 'enemies/psycojack/psycojack.json');
        this.load.atlas('balrog', 'enemies/balrog/balrog.png', 'enemies/balrog/balrog.json');

        //attack
        this.load.atlas('fireScratch', 'tools/fireScratch/fireScratch.png', 'tools/fireScratch/fireScratch.json');
        this.load.atlas('iceScratch', 'tools/IceScratch/IceScratch.png', 'tools/IceScratch/IceScratch.json');
        this.load.atlas('beam', 'tools/beam/beam.png', 'tools/beam/beam.json');
        this.load.atlas('ice', 'tools/ice/ice.png', 'tools/ice/ice.json');
        this.load.atlas('star', 'tools/star/star.png', 'tools/star/star.json');
        this.load.atlas('scratch', 'tools/scratch/scratch.png', 'tools/scratch/scratch.json');
        this.load.atlas('fireBeam', 'tools/fireBeam/fireBeam.png', 'tools/fireBeam/fireBeam.json');
        this.load.atlas('fireLight', 'tools/fireLight/fireLight.png', 'tools/fireLight/fireLight.json');
        this.load.atlas('magician', 'tools/magician/magician.png', 'tools/magician/magician.json');

        //npc
        this.load.atlas('npc', 'npc/npc.png', 'npc/npc.json');

        //bubble
        this.load.atlas('bubble', 'bubble/bubble.png', 'bubble/bubble.json');

        //pet
        this.load.atlas('blackPet', 'pet/blackPet/blackPet.png', 'pet/blackPet/blackPet.json');
        this.load.atlas('brownPet', 'pet/brownPet/brownPet.png', 'pet/brownPet/brownPet.json');

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
        this.load.audio('scene0', 'sounds/scene0.mp3');
        this.load.audio('scene1', 'sounds/scene1.mp3');
        this.load.audio('scene2', 'sounds/scene2.mp3');
        this.load.audio('fire', 'sounds/fire.mp3');
        this.load.audio('effect', 'sounds/effect.mp3');
        this.load.audio('beam', 'sounds/beam.mp3');
        this.load.audio('getPotion', 'sounds/getPotion.mp3');
        this.load.audio('portal', 'sounds/portal.mp3');
    }
    create() {
        this.game.scene.start('selectPlayer');
    }
}
