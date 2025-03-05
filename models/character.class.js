/**
 * Represents a playable character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
  height = 91 * 3;
  width = 67 * 3;
  y = 395;
  currentX;
  world;
  sleepTimeout = null;
  sleep = false;
  walking_sound = new Audio("audio/run.mp3");
  sleeping_sound = new Audio("audio/sleeping.mp3");
  jumping_sound = new Audio("audio/jumping.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  lose_sound = new Audio("audio/lose.mp3");
  isDeadAnimationComplete = false;
  gameOverSoundPlayed = false;
  isBouncing = false;
  isShooting = false;

  /**
   * Collision offset values.
   * @type {{ top: number, bottom: number, left: number, right: number }}
   */
  offset = {
    top: 0,
    bottom: 100,
    left: 20,
    right: 50,
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
    "img/run/run_frame_10.png",
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
    "img/jump/jump_frame_9.png",
    "img/jump/jump_frame_10.png",
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
  SLEEP_IMAGES = [
    "img/sleep_idle/sleep_1.png",
    "img/sleep_idle/sleep_2.png",
    "img/sleep_idle/sleep_3.png",
    "img/sleep_idle/sleep_4.png",
    "img/sleep_idle/sleep_5.png",
    "img/sleep_idle/sleep_6.png",
    "img/sleep_idle/sleep_7.png",
    "img/sleep_idle/sleep_8.png",
    "img/sleep_idle/sleep_9.png",
    "img/sleep_idle/sleep_10.png",
    "img/sleep_idle/sleep_11.png",
  ];
  SHOOT_IMAGES = [
    "img/shot/shoot_1.png",
    "img/shot/shoot_2.png",
    "img/shot/shoot_3.png",
    "img/shot/shoot_4.png",
  ];

  constructor() {
    super().loadImage("img/idle/idle_frame_1.png");
    this.loadImages(this.IDLE_IMAGES);
    this.loadImages(this.RUN_IMAGES);
    this.loadImages(this.JUMP_IMAGES);
    this.loadImages(this.DEAD_IMAGES);
    this.loadImages(this.HURT_IMAGES);
    this.loadImages(this.SLEEP_IMAGES);
    this.loadImages(this.SHOOT_IMAGES);
    sounds.push(this.walking_sound);
    sounds.push(this.sleeping_sound);
    sounds.push(this.jumping_sound);
    sounds.push(this.hurt_sound);
    sounds.push(this.lose_sound);
    this.currentX = this.x;
    this.startSleepCheck();
    this.applyGravity();
    this.animate();
  }

  /**
   * Starts character animations and movement updates.
   */
  animate() {
    setInterval(() => {
      this.updateMovement();
      this.updatePosition();
    }, 1000 / 60);

    setInterval(() => {
      this.updateAnimations();
    }, 150);
  }

  /**
   * Updates character movement based on keyboard input.
   */
  updateMovement() {
    this.walking_sound.pause();
    this.setAudioVolumes();

    if (!this.isDead()) {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.runRight();
      }
      if (this.world.keyboard.LEFT && this.x > -500) {
        this.runLeft();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
    }
  }

  /**
   * Updates the character's position.
   */
  updatePosition() {
    if (!this.isAboveGround()) {
      this.y = 395;
      this.isBouncing = false;
    }
    this.world.camera_x = -this.x + 50;
  }

  /**
   * Updates character animations based on state.
   */
  updateAnimations() {
    const isMuted = localStorage.getItem("muted") === "true";
    if (this.isDead()) {
      this.handleGameEnd(this);
    } else if (this.isHurt() && this.energy > 0) {
      this.playAnimation(this.HURT_IMAGES);
      if (!isMuted) {
        this.hurt_sound.play();
      }
    } else if (this.isAboveGround()) {
      this.playAnimation(this.JUMP_IMAGES);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.RUN_IMAGES);
    } else if (this.world.keyboard.F && this.ammo >= 1) {
      this.wakeUp();
      this.playAnimation(this.SHOOT_IMAGES);
    } else if (this.sleep && this.energy > 0) {
      this.sleeps();
    } else {
      this.playAnimation(this.IDLE_IMAGES);
    }
  }

  /**
   * Handles the game-ending sequence for the given character.
   * @param {Character} character - The character instance that has reached the game-over state.
   */
  handleGameEnd(character) {
    if (character.isDeadAnimationComplete) {
      return;
    }

    const inGameButtons = document.querySelector(".in_game_buttons");
    inGameButtons.classList.remove("visible");

    if (character.isAboveGround()) {
      return;
    }

    if (!character.isDeadAnimationComplete) {
      character.playAnimationOnce(character.DEAD_IMAGES);

      setTimeout(() => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        character.isDeadAnimationComplete = true;
        this.handleElements();
        clearInterval(this.world.animationFrameId);
        this.world.stopGame();
        this.stopAllSounds();
      }, 1000);
    }
  }

  /**
   * Handles the visibility and display settings of end-game elements.
   */
  handleElements() {
    const endScreen = document.getElementById("end_screen");
    const mobileButtons = document.getElementById("mobile_buttons");
    endScreen.style.visibility = "visible";
    endScreen.style.opacity = 1;
    mobileButtons.style.display = "none";
  }

  /**
   * Makes the character bounce off an enemy.
   */
  bounceOffEnemy() {
    if (!this.isBouncing) {
      this.isBouncing = true;
      this.speedY = 20;
    }
  }

  /** Moves character to the right. */
  runRight() {
    this.wakeUp();
    this.moveRight();
    this.otherDirection = false;
    this.savePosition();
    this.sleeping();
    const isMuted = localStorage.getItem("muted") === "true";
    if (!isMuted) {
      this.walking_sound.play();
    }
  }

  /** Moves character to the left. */
  runLeft() {
    this.wakeUp();
    this.otherDirection = true;
    this.moveLeft();
    this.savePosition();
    this.sleeping();
    const isMuted = localStorage.getItem("muted") === "true";
    if (!isMuted) {
      this.walking_sound.play();
    }
  }

  /** Makes the character jump. */
  jump() {
    this.wakeUp();
    this.sleeping();
    this.speedY = 30;
    const isMuted = localStorage.getItem("muted") === "true";
    if (!isMuted) {
      this.jumping_sound.play();
    }
  }

  /** Starts checking if the character is idle for too long. */
  startSleepCheck() {
    this.sleeping();
  }

  /** Checks if the character should enter sleep mode. */
  sleeping() {
    if (this.sleepTimeout) clearTimeout(this.sleepTimeout);
    if (!this.isDead()) {
      this.sleepTimeout = setTimeout(() => {
        if (this.currentX === this.x && !this.isAboveGround()) {
          this.sleep = true;
          this.sleeps();
        }
      }, 10000);
    }
  }

  /** Puts the character into sleep mode. */
  sleeps() {
    this.sleep = true;
    this.playAnimation(this.SLEEP_IMAGES);
    const isMuted = localStorage.getItem("muted") === "true";
    if (!isMuted) {
      this.sleeping_sound.play();
    }
  }

  /** Wakes the character up from sleep mode. */
  wakeUp() {
    this.sleep = false;
    this.sleeping();
    this.sleeping_sound.pause();
  }

  /** Saves the current position of the character. */
  savePosition() {
    this.currentX = this.x;
  }

  /** Sets the volume for all character sounds. */
  setAudioVolumes() {
    this.walking_sound.volume = 0.02;
    this.sleeping_sound.volume = 0.2;
    this.jumping_sound.volume = 0.2;
    this.hurt_sound.volume = 0.1;
    this.lose_sound.volume = 0.1;
  }

  stopAllSounds() {
    this.walking_sound.pause();
    this.walking_sound.currentTime = 0;

    this.sleeping_sound.pause();
    this.sleeping_sound.currentTime = 0;

    this.jumping_sound.pause();
    this.jumping_sound.currentTime = 0;

    this.hurt_sound.pause();
    this.hurt_sound.currentTime = 0;

    this.lose_sound.pause();
    this.lose_sound.currentTime = 0;

    clearTimeout(this.sleepTimeout);
  }
}
