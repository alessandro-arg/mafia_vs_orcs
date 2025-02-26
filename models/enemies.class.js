/**
 * Represents an enemy in the game.
 * Inherits from MovableObject and handles enemy animations and movement.
 */
class Enemie extends MovableObject {
  height = 65 * 2.5;
  width = 75 * 2.5;
  y = 505;
  isDeadAnimationStarted = false;
  isDeadAnimationComplete = false;

  offset = {
    top: -10,
    bottom: 0,
    left: 120,
    right: 20,
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

  /**
   * Creates a new enemy instance, initializes its images and movement.
   */
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

  /**
   * Handles the enemy animations and movement.
   */
  animate() {
    setInterval(() => {
      if (this.isDead() && !this.isDeadAnimationComplete) {
        if (!this.isDeadAnimationStarted) {
          this.isDeadAnimationStarted = true;
          this.currentImage = 0;
        }
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

  /**
   * Stops the enemy at its current position.
   */
  stopAtCurrentPosition() {
    this.speed = 0;
  }
}
