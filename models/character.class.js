class Character extends MovableObject {
  height = 350;
  width = 350;
  speed = 8;
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
  world;
  walking_sound = new Audio("audio/run.mp3");

  constructor() {
    super().loadImage("img/idle/idle_frame_1.png");
    this.loadImages(this.IDLE_IMAGES);
    this.loadImages(this.RUN_IMAGES);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > -500) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 50;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.RUN_IMAGES);
      } else {
        this.playAnimation(this.IDLE_IMAGES);
      }
    }, 120);
  }
}
