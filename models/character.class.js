class Character extends MovableObject {
  height = 71 * 3;
  width = 52 * 3;
  y = 450;
  isDeadAnimationComplete = false;
  IDLE_IMAGES = [
    "img/idle/idle_frame_1.png",
    "img/idle/idle_frame_2.png",
    "img/idle/idle_frame_3.png",
    "img/idle/idle_frame_4.png",
    "img/idle/idle_frame_5.png",
    "img/idle/idle_frame_6.png",
  ];
  RUN_IMAGES = [
    "img/run/run_frame_1.png",
    "img/run/run_frame_2.png",
    "img/run/run_frame_3.png",
    "img/run/run_frame_4.png",
    "img/run/run_frame_5.png",
    "img/run/run_frame_6.png",
    "img/run/run_frame_7.png",
    "img/run/run_frame_8.png",
    "img/run/run_frame_9.png",
  ];
  JUMP_IMAGES = [
    "img/jump/jump_frame_1.png",
    "img/jump/jump_frame_2.png",
    "img/jump/jump_frame_3.png",
    "img/jump/jump_frame_4.png",
    "img/jump/jump_frame_5.png",
    "img/jump/jump_frame_6.png",
    "img/jump/jump_frame_7.png",
    "img/jump/jump_frame_8.png",
  ];
  DEAD_IMAGES = [
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_2.png",
    "img/dead/dead_frame_3.png",
    "img/dead/dead_frame_4.png",
    "img/dead/dead_frame_5.png",
  ];
  HURT_IMAGES = [
    "img/hurt/hurt_frame_1.png",
    "img/hurt/hurt_frame_2.png",
    "img/hurt/hurt_frame_3.png",
    "img/hurt/hurt_frame_4.png",
    "img/hurt/hurt_frame_5.png",
  ];
  world;
  walking_sound = new Audio("audio/run.mp3");

  constructor() {
    super().loadImage("img/idle/idle_frame_1.png");
    this.loadImages(this.IDLE_IMAGES);
    this.loadImages(this.RUN_IMAGES);
    this.loadImages(this.JUMP_IMAGES);
    this.loadImages(this.DEAD_IMAGES);
    this.loadImages(this.HURT_IMAGES);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();

      if (!this.isDead()) {
        if (
          this.world.keyboard.RIGHT &&
          this.x < this.world.level.level_end_x
        ) {
          this.moveRight();
          this.otherDirection = false;
          this.walking_sound.play();
        }

        if (this.world.keyboard.LEFT && this.x > -500) {
          this.moveLeft();
          this.otherDirection = true;
          this.walking_sound.play();
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
          this.jump();
        }
      }

      this.world.camera_x = -this.x + 50;
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        const inGameButtons = document.querySelector(".in_game_buttons");
        const endScreen = document.getElementById("end_screen");
        inGameButtons.classList.remove("visible");
        if (!this.isDeadAnimationComplete) {
          this.playAnimationOnce(this.DEAD_IMAGES);
          setTimeout(() => {
            endScreen.style.visibility = "visible";
            endScreen.style.opacity = 1;
            this.isDeadAnimationComplete = true;
            updateInGameButtonsVisibility();
          }, 1000);
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.HURT_IMAGES);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.JUMP_IMAGES);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.RUN_IMAGES);
      } else {
        this.playAnimation(this.IDLE_IMAGES);
      }
    }, 150);
  }
}
