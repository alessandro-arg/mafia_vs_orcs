class Enemie extends MovableObject {
  height = 250;
  width = 200;
  y = 430;

  constructor() {
    super().loadImage("img/enemie/enemy_run_frame_6_mirrored.png");
    this.x = 250 + Math.random() * 800;
  }
}
