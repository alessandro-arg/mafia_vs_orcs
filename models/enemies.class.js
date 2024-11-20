class Enemie extends MovableObject {
  height = 250;
  width = 200;
  y = 430;
  ENEMIES_IMAGES = [
    "img/enemie/enemy_run_frame_1_mirrored.png",
    "img/enemie/enemy_run_frame_2_mirrored.png",
    "img/enemie/enemy_run_frame_3_mirrored.png",
    "img/enemie/enemy_run_frame_4_mirrored.png",
    "img/enemie/enemy_run_frame_5_mirrored.png",
    "img/enemie/enemy_run_frame_6_mirrored.png",
    "img/enemie/enemy_run_frame_7_mirrored.png",
    "img/enemie/enemy_run_frame_8_mirrored.png",
    "img/enemie/enemy_run_frame_9_mirrored.png",
  ];

  constructor() {
    super().loadImage("img/enemie/enemy_run_frame_1_mirrored.png");
    this.loadImages(this.ENEMIES_IMAGES);
    this.x = 250 + Math.random() * 2500;
    this.animate(0.5);
    this.animateRun(100);
  }

  animateRun(time) {
    setInterval(() => {
      this.playAnimation(this.ENEMIES_IMAGES);
    }, time);
  }
}
