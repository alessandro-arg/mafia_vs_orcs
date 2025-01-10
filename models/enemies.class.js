class Enemie extends MovableObject {
  height = 64 * 2;
  width = 31 * 2;
  y = 535;
  ENEMIE_WALKING = [
    "img/enemie/enemy_type_1/enemy1_run_frame_7.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_6.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_5.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_4.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_3.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_2.png",
    "img/enemie/enemy_type_1/enemy1_run_frame_1.png",
  ];
  ENEMIE_DEAD = [];

  constructor() {
    super().loadImage("img/enemie/enemy_type_1/enemy1_run_frame_7.png");
    this.loadImages(this.ENEMIE_WALKING);
    this.x = 1000 + Math.random() * 2500;
    this.speed = 0.5 + Math.random() * 1;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.ENEMIE_WALKING);
      //   if (this.isDead()) {
      //     this.playAnimation(this.ENEMIE_DEAD);
      // }
    }, 100);
  }
}
