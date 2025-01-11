class Character extends MovableObject {
  height = 71 * 3;
  width = 52 * 3;
  y = 450;
  currentX;
  sleep = false;
  world;
  walking_sound = new Audio("audio/run.mp3");
  // sleeping_sound = new Audio ("");
  isDeadAnimationComplete = false;

  offset = {
    top: 0,
    bottom: 0,
    left: 20,
    right: -60,
  };

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

  constructor() {
    super().loadImage("img/idle/idle_frame_1.png");
    this.loadImages(this.IDLE_IMAGES);
    this.loadImages(this.RUN_IMAGES);
    this.loadImages(this.JUMP_IMAGES);
    this.loadImages(this.DEAD_IMAGES);
    this.loadImages(this.HURT_IMAGES);
    // this.loadImages(this.SLEEP_IMAGES);
    this.applyGravity();
    this.animate();
    this.sleeping();
  }

  animate() {
    setIntervalAndTrack(() => {
      this.walking_sound.pause();

      if (!this.isDead()) {
        if (
          this.world.keyboard.RIGHT &&
          this.x < this.world.level.level_end_x
        ) {
          this.runRight();
        }

        if (this.world.keyboard.LEFT && this.x > -500) {
          this.runLeft();
        }

        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
          this.jump();
        }
      }

      this.world.camera_x = -this.x + 50;
    }, 1000 / 60);

    setIntervalAndTrack(() => {
      if (this.isDead()) {
        this.handleGameEnd(this);
      } else if (this.isHurt()) {
        this.playAnimation(this.HURT_IMAGES);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.JUMP_IMAGES);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.RUN_IMAGES);
      } else if (this.sleep) {
        this.sleeps();
      } else {
        this.playAnimation(this.IDLE_IMAGES);
      }
    }, 150);
  }

  handleGameEnd(character) {
    const inGameButtons = document.querySelector(".in_game_buttons");
    const endScreen = document.getElementById("end_screen");

    inGameButtons.classList.remove("visible");

    if (!character.isDeadAnimationComplete) {
      character.playAnimationOnce(character.DEAD_IMAGES);

      setTimeout(() => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        endScreen.style.visibility = "visible";
        endScreen.style.opacity = 1;
        character.isDeadAnimationComplete = true;
      }, 1000);
    } else if (!this.isDead()) {
      inGameButtons.classList.add("visible");
      character.isDeadAnimationComplete = false;
    }
  }

  runRight() {
    this.wakeUp();
    this.moveRight();
    this.otherDirection = false;
    this.savePosition();
    this.walking_sound.play();
  }

  runLeft() {
    this.wakeUp();
    this.otherDirection = true;
    this.moveLeft();
    this.savePosition();
    this.walking_sound.play();
  }

  jump() {
    this.wakeUp();
    this.speedY = 30;
  }

  sleeping() {
    setInterval(() => {
      if (this.currentX == this.x) {
        this.sleep = true;
      }
    }, 10000);
  }

  sleeps() {
    console.log("Sleeping");

    // this.playAnimation(this.SLEEP_IMAGES);
    // this.world.playSound(this.sleeping_sound);
  }

  wakeUp() {
    this.walking_sound.pause();
    this.sleep = false;
  }

  savePosition() {
    this.currentX = this.x;
  }
}
