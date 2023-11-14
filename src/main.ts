import "./style.css";
import Phaser from "phaser";
import Preloader from "./components/scenes/Preloader";
import DisplayScene from "./components/scenes/DisplayScene";
import SelectPlayerScene from "./components/scenes/PlayerSettingScene";

new Phaser.Game({
  // type: Phaser.WEBGL,
  width: "100%",
  height: "100%",
  physics: {
    default: "arcade",
    arcade: {
      debug: import.meta.env.DEV,
      gravity: { y: 2500 },
    },
  },
  scene: [Preloader, SelectPlayerScene, DisplayScene],
});
