class Enemie extends MovableObject {
  height = 200;
  width = 200;
  y = 465;
  ENEMIES_IMAGES = [
    "img/enemie/enemy_type_1/enemy1_run_frame_7.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_6.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_5.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_4.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_3.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_2.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_1.png",
  ];

  constructor() {
    super().loadImage("img/enemie/enemy_type_1/enemy1_run_frame_7.png");
    this.loadImages(this.ENEMIES_IMAGES);
    this.x = 250 + Math.random() * 2500;
    this.speed = 0.5 + Math.random() * 1;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.ENEMIES_IMAGES);
    }, 100);
  }
}
