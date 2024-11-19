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

  constructor() {
    super().loadImage("img/idle/idle_frame_1.png");
    this.loadImages(this.IDLE_IMAGES);
    this.loadImages(this.RUN_IMAGES);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x;
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % this.RUN_IMAGES.length;
        let path = this.RUN_IMAGES[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      } else {
        let i = this.currentImage % this.IDLE_IMAGES.length;
        let path = this.IDLE_IMAGES[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 150);
  }
}
