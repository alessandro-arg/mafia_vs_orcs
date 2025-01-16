class Enemie2 extends MovableObject {
  height = 64 * 2.5;
  width = 31 * 2.5;
  y = 505;
  isDeadAnimationStarted = false;
  isDeadAnimationComplete = false;

  ENEMIE2_WALKING = [
    "img/enemie/enemy_type_2/enemy_2_run/enemy2_run_frame_1.png",
    "img/enemie/enemy_type_2/enemy_2_run/enemy2_run_frame_2.png",
    "img/enemie/enemy_type_2/enemy_2_run/enemy2_run_frame_3.png",
    "img/enemie/enemy_type_2/enemy_2_run/enemy2_run_frame_4.png",
    "img/enemie/enemy_type_2/enemy_2_run/enemy2_run_frame_5.png",
    "img/enemie/enemy_type_2/enemy_2_run/enemy2_run_frame_6.png",
    "img/enemie/enemy_type_2/enemy_2_run/enemy2_run_frame_7.png",
  ];
  ENEMIE2_DEAD = [
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_1.png",
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_2.png",
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_3.png",
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_4.png",
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_5.png",
  ];

  constructor() {
    super().loadImage(
      "img/enemie/enemy_type_2/enemy_2_run/enemy2_run_frame_1.png"
    );
    this.loadImages(this.ENEMIE2_WALKING);
    this.loadImages(this.ENEMIE2_DEAD);
    this.x = 1000 + Math.random() * (1280 * 5);
    this.speed = 1 + Math.random() * 1.5;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.height = 65 * 2.5;
        this.width = 75 * 2.5;
        this.playAnimationOnce(this.ENEMIE2_DEAD);
      } else {
        this.playAnimation(this.ENEMIE2_WALKING);
      }
    }, 100);

    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  stopAtCurrentPosition() {
    this.speed = 0;
  }
}
