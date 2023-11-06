import './style.css';
import Phaser from 'phaser';

new Phaser.Game({
    type: Phaser.WEBGL,
    width: '100%',
    height: '100%',
    physics: {
        default: 'arcade',
        arcade: {
            debug: import.meta.env.DEV,
            gravity: { y: 2500 }
        }
    }
});
