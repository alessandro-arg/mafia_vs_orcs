class Character extends MovableObject {
  height = 350;
  width = 350;
  IDLE_IMAGES = [
    "img/idle/idle_frame_1.png",
    "img/idle/idle_frame_2.png",
    "img/idle/idle_frame_3.png",
    "img/idle/idle_frame_4.png",
    "img/idle/idle_frame_5.png",
    "img/idle/idle_frame_6.png",
  ];

  constructor() {
    super().loadImage("img/idle/idle_frame_1.png");
    this.loadImages(this.IDLE_IMAGES);
    this.animate(150);
  }

  animate(time) {
    setInterval(() => {
      let i = this.currentImage % this.IDLE_IMAGES.length;
      let path = this.IDLE_IMAGES[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, time);
  }

  jump() {}
}
