export default class MiniMap {
  camera: Phaser.Cameras.Scene2D.Camera;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    map: Phaser.Tilemaps.Tilemap
  ) {
    const zoom = 0.1;
    this.camera = scene.cameras
      .add(x, y, width, height)
      .setZoom(zoom)
      .setBounds(0, 0, 5900, map.heightInPixels)
      .setBackgroundColor(0x000000)
      .setAlpha(0.75)
      .setName("minimap");
  }

  update(player: Phaser.Physics.Arcade.Sprite) {
    this.camera.scrollX = player.x;
    this.camera.scrollY = player.y;
  }
}
