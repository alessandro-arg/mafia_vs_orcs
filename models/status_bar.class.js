class Statusbar extends DrawableObject {
  HEALTH_IMAGES = [
    "img/healthbar/health_frame_1.png",
    "img/healthbar/health_frame_2.png",
    "img/healthbar/health_frame_3.png",
    "img/healthbar/health_frame_4.png",
    "img/healthbar/health_frame_5.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.HEALTH_IMAGES);
    this.x = 50;
    this.y = 20;
    this.width = 47 * 5;
    this.height = 7 * 5;
    this.setPercentage(100);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.HEALTH_IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage >= 70) {
      return 1;
    } else if (this.percentage >= 50) {
      return 2;
    } else if (this.percentage >= 20) {
      return 3;
    } else {
      return 4;
    }
  }
}
