class Endboss extends MovableObject {
  height = 500;
  width = 500;
  y = 165;

  ENDBOSS_IDLE = [
    "img/boss/idle/idle_boss_frame_1_mirrored.png",
    "img/boss/idle/idle_boss_frame_2_mirrored.png",
    "img/boss/idle/idle_boss_frame_3_mirrored.png",
    "img/boss/idle/idle_boss_frame_4_mirrored.png",
    "img/boss/idle/idle_boss_frame_5_mirrored.png",
  ];
  ENDBOSS_HURT = [
    "img/boss/idle/idle_boss_frame_5_mirrored.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
    "img/dead/dead_frame_1.png",
  ];
  ENDBOSS_DEAD = [
    "img/numbers/numbers__02.png",
    "img/numbers/numbers__02.png",
    "img/numbers/numbers__02.png",
    "img/numbers/numbers__02.png",
    "img/numbers/numbers__02.png",
    "img/numbers/numbers__02.png",
    "img/numbers/numbers__02.png",
  ];

  constructor() {
    super().loadImage("img/boss/idle/idle_boss_frame_1_mirrored.png");
    this.loadImages(this.ENDBOSS_IDLE);
    this.loadImages(this.ENDBOSS_HURT);
    this.loadImages(this.ENDBOSS_DEAD);
    this.x = 3200;
    this.animate();
  }

  animate() {
    setIntervalAndTrack(() => {
      if (this.isDead()) {
        this.handleGameEnd(this);
      } else if (this.isHurt()) {
        this.playHurtAnimation();
      } else {
        this.playAnimation(this.ENDBOSS_IDLE);
      }
    }, 150);
  }

  handleGameEnd(endboss) {
    const inGameButtons = document.querySelector(".in_game_buttons");
    const winScreen = document.getElementById("win_screen");

    inGameButtons.classList.remove("visible");

    if (!endboss.isDeadAnimationComplete) {
      endboss.playDeadAnimation();

      setTimeout(() => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        winScreen.style.visibility = "visible";
        winScreen.style.opacity = 1;
        endboss.isDeadAnimationComplete = true;
      }, 1000);
    } else if (!this.isDead()) {
      inGameButtons.classList.add("visible");
      endboss.isDeadAnimationComplete = false;
    }
  }

  playHurtAnimation() {
    this.playAnimationOnce(this.ENDBOSS_HURT);
  }

  playDeadAnimation() {
    this.playAnimationOnce(this.ENDBOSS_DEAD);
  }
}
