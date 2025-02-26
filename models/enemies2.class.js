/**
 * Represents a second type of enemy in the game.
 * Inherits from MovableObject and handles animations and movement.
 */
class Enemie2 extends MovableObject {
  height = 61 * 2.5;
  width = 70 * 2.5;
  y = 514;
  isDeadAnimationStarted = false;
  isDeadAnimationComplete = false;

  offset = {
    top: -10,
    bottom: 0,
    left: 30,
    right: 100,
  };

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
    "img/enemie/enemy_type_2/enemy_2_dead/enemie2_dead_4.png",
    "img/enemie/enemy_type_2/enemy_2_dead/enemie2_dead_3.png",
    "img/enemie/enemy_type_2/enemy_2_dead/enemie2_dead_2.png",
    "img/enemie/enemy_type_2/enemy_2_dead/enemie2_dead_1.png",
  ];
  /**
   * Creates a new second type enemy instance, initializes its images and movement.
   */
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

  /**
   * Handles the second type enemy animations and movement.
   */
  animate() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimationOnce(this.ENEMIE2_DEAD);
      } else {
        this.playAnimation(this.ENEMIE2_WALKING);
      }
    }, 100);

    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
   * Stops the second type enemy at its current position.
   */
  stopAtCurrentPosition() {
    this.speed = 0;
  }
}
