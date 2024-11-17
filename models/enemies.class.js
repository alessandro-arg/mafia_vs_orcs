class Enemie extends MovableObject {
  constructor() {
    super().loadImage("./img/enemie/enemy_frame_1.png");
    this.x = 250 + Math.random() * 800;
  }
}
