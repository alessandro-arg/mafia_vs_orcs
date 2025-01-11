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
  ENDBOSS_HURT = [];

  constructor() {
    super().loadImage("img/boss/idle/idle_boss_frame_1_mirrored.png");
    this.loadImages(this.ENDBOSS_IDLE);
    this.x = 3200;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.ENDBOSS_IDLE);
    }, 150);
  }

  playHurtAnimation() {
    this.playAnimation(this.ENDBOSS_HURT);
  }
}
