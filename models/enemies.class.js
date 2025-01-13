class Enemie extends MovableObject {
  height = 64 * 2.5;
  width = 31 * 2.5;
  y = 505;
  isDeadAnimationStarted = false;
  isDeadAnimationComplete = false;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  ENEMIE_WALKING = [
    "img/enemie/enemy_type_1/enemy_1_run/enemy1_run_frame_7.png",
    "img/enemie/enemy_type_1/enemy_1_run/enemy1_run_frame_6.png",
    "img/enemie/enemy_type_1/enemy_1_run/enemy1_run_frame_5.png",
    "img/enemie/enemy_type_1/enemy_1_run/enemy1_run_frame_4.png",
    "img/enemie/enemy_type_1/enemy_1_run/enemy1_run_frame_3.png",
    "img/enemie/enemy_type_1/enemy_1_run/enemy1_run_frame_2.png",
    "img/enemie/enemy_type_1/enemy_1_run/enemy1_run_frame_1.png",
  ];
  ENEMIE_DEAD = [
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_1.png",
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_2.png",
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_3.png",
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_4.png",
    "img/enemie/enemy_type_1/enemy_1_dead/enemie_dead_frame_5.png",
  ];

  constructor() {
    super().loadImage(
      "img/enemie/enemy_type_1/enemy_1_run/enemy1_run_frame_7.png"
    );
    this.loadImages(this.ENEMIE_WALKING);
    this.loadImages(this.ENEMIE_DEAD);
    this.x = 1000 + Math.random() * (1280 * 6);
    this.speed = 0.5 + Math.random() * 1;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.isDead() && !this.isDeadAnimationComplete) {
        if (!this.isDeadAnimationStarted) {
          this.isDeadAnimationStarted = true;
          this.currentImage = 0;
        }
        this.height = 65 * 2.5;
        this.width = 75 * 2.5;
        this.playAnimationOnce(this.ENEMIE_DEAD);
      } else if (!this.isDead()) {
        this.isDeadAnimationStarted = false;
        this.isDeadAnimationComplete = false;
        this.playAnimation(this.ENEMIE_WALKING);
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
