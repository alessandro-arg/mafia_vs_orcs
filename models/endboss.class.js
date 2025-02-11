class Endboss extends MovableObject {
  height = 500;
  width = 500;
  y = 166;
  isMoving = false;
  isDeadAnimationComplete = false;
  isHurtAnimationPlaying = false;
  isLoseAnimationPlaying = false;
  isAttacking = false;
  gameOverSoundPlayed = false;
  victory_sound = new Audio("audio/victory.mp3");
  fight_start_sound = new Audio("audio/start_fight.mp3");

  offset = {
    top: 0,
    bottom: 0,
    left: 200,
    right: 20,
  };

  ENDBOSS_IDLE = [
    "img/boss/idle/endboss_idle_5.png",
    "img/boss/idle/endboss_idle_4.png",
    "img/boss/idle/endboss_idle_3.png",
    "img/boss/idle/endboss_idle_2.png",
    "img/boss/idle/endboss_idle_1.png",
  ];
  ENDBOSS_WALK = [
    "img/boss/walk/boss_walk_7.png",
    "img/boss/walk/boss_walk_6.png",
    "img/boss/walk/boss_walk_5.png",
    "img/boss/walk/boss_walk_4.png",
    "img/boss/walk/boss_walk_3.png",
    "img/boss/walk/boss_walk_2.png",
    "img/boss/walk/boss_walk_1.png",
  ];
  ENDBOSS_RUN = [
    "img/boss/run/endboss_run_6.png",
    "img/boss/run/endboss_run_5.png",
    "img/boss/run/endboss_run_4.png",
    "img/boss/run/endboss_run_3.png",
    "img/boss/run/endboss_run_2.png",
    "img/boss/run/endboss_run_1.png",
  ];
  ENDBOSS_HURT = [
    "img/boss/hurt/endboss_hurt_2.png",
    "img/boss/hurt/endboss_hurt_1.png",
  ];
  ENDBOSS_ATTACK = [
    "img/boss/attack/attack_boss_frame_1.png",
    "img/boss/attack/attack_boss_frame_2.png",
    "img/boss/attack/attack_boss_frame_3.png",
    "img/boss/attack/attack_boss_frame_4.png",
  ];
  ENDBOSS_DEAD = [
    "img/boss/dead/endboss_dead_4.png",
    "img/boss/dead/endboss_dead_3.png",
    "img/boss/dead/endboss_dead_2.png",
    "img/boss/dead/endboss_dead_1.png",
  ];

  constructor() {
    super().loadImage("img/boss/idle/endboss_idle_5.png");
    this.loadImages(this.ENDBOSS_IDLE);
    this.loadImages(this.ENDBOSS_WALK);
    this.loadImages(this.ENDBOSS_RUN);
    this.loadImages(this.ENDBOSS_HURT);
    this.loadImages(this.ENDBOSS_ATTACK);
    this.loadImages(this.ENDBOSS_DEAD);
    sounds.push(this.victory_sound);
    sounds.push(this.fight_start_sound);
    this.x = 1280 * 5.5;
    this.speed = 3;
    this.animate();
  }

  animate() {
    setIntervalAndTrack(() => {
      if (this.isDead()) {
        this.handleGameEnd(this);
      } else if (this.isHurt() && !this.isHurtAnimationPlaying) {
        this.playHurtAnimation();
      } else if (this.energy <= 60 && this.energy > 0) {
        this.startMoving();
        this.scheduleAttackAnimation();
      } else {
        this.playAnimation(this.ENDBOSS_IDLE);
      }
    }, 150);
  }

  handleGameEnd(endboss) {
    const inGameButtons = document.querySelector(".in_game_buttons");
    const winScreen = document.getElementById("win_screen");
    inGameButtons.classList.remove("visible");
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.attackInterval);
    endboss.playAnimationOnce(endboss.ENDBOSS_DEAD);

    setTimeout(() => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
      winScreen.style.visibility = "visible";
      winScreen.style.opacity = 1;
      endboss.isDeadAnimationComplete = true;
    }, 2000);
    if (!this.isDead()) {
      inGameButtons.classList.add("visible");
      endboss.isDeadAnimationComplete = false;
    }
  }

  playHurtAnimation() {
    this.isHurtAnimationPlaying = true;
    this.playAnimationOnce(this.ENDBOSS_HURT);
    setTimeout(() => {
      this.isHurtAnimationPlaying = false;
    }, 400);
  }

  startMoving() {
    if (!this.isMoving) {
      this.isMoving = true;

      this.movementInterval = setInterval(() => {
        if (this.energy <= 20) {
          this.x -= this.speed * 2;
        } else {
          this.x -= this.speed;
        }
      }, 1000 / 60);

      this.animationInterval = setInterval(() => {
        if (this.energy <= 20) {
          this.playAnimation(this.ENDBOSS_RUN);
        } else {
          this.playAnimation(this.ENDBOSS_WALK);
        }
      }, 150);
    }
  }

  stopMoving() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    this.isMoving = false;
  }

  scheduleAttackAnimation() {
    if (!this.attackInterval) {
      this.attackInterval = setInterval(() => {
        if (this.energy <= 60 && !this.isAttacking) {
          this.playAttackAnimation();
        }
      }, this.getRandomAttackDelay());
    }
  }

  playAttackAnimation() {
    this.isAttacking = true;
    this.stopMoving();

    let attackFrameIndex = 0;
    let attackInterval = setInterval(() => {
      this.img = this.imageCache[this.ENDBOSS_ATTACK[attackFrameIndex]];
      attackFrameIndex++;

      if (attackFrameIndex >= this.ENDBOSS_ATTACK.length) {
        clearInterval(attackInterval);
        this.isAttacking = false;
        this.startMoving();
      }
    }, 50);
  }

  getRandomAttackDelay() {
    return Math.random() * 4000 + 1000;
  }

  stopAtCurrentPosition() {
    this.speed = 0;
  }

  stopWhenCharacterDies() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    this.stopAtCurrentPosition();
    this.isMoving = false;
    this.isAttacking = false;
    this.isHurtAnimationPlaying = false;
    this.isLoseAnimationPlaying = false;
    this.playAnimation(this.ENDBOSS_IDLE);
  }
}
