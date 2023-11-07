export default class Preloader extends Phaser.Scene {
    constructor() {
        super({ key: 'preloader' });
    }
    preload() {
        this.load.setBaseURL('assets');
        this.load.image('bg1', 'background/bg1.png');
        this.load.atlas('player', 'player/poy.png', 'player/poy.json');
        this.load.atlas('worm', 'enemies/bug/worm.png', 'enemies/bug/worm.json');
        this.load.atlas('bee', 'enemies/bee/bee.png', 'enemies/bee/bee.json');
        this.load.atlas('bird', 'enemies/bird/bird.png', 'enemies/bird/bird.json');
        this.load.atlas('seal', 'enemies/seal/seal.png', 'enemies/seal/seal.json');

        //attack
        this.load.atlas('effect', 'tools/effect/effect.png', 'tools/effect/effect.json');
        this.load.atlas('fire', 'tools/fire/fire.png', 'tools/fire/fire.json');
        this.load.atlas('wind', 'tools/wind/wind.png', 'tools/wind/wind.json');

        //tile
        this.load.image('platforms', 'map/texture.png');
        this.load.tilemapTiledJSON('map', 'map/map.json');

        this.load.image('platforms', 'map/platform.png');
        this.load.image('ladder', 'map/ladder.png');
        this.load.image('move4', 'map/move4x1.png');
        this.load.image('move6', 'map/move6x1.png');
        this.load.tilemapTiledJSON('map', 'map/map.json');
    }
    create() {
        this.game.scene.start('display');
    }
}
