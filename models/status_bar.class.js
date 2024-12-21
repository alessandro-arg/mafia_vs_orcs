class Statusbar extends DrawableObject {
  HEALTH_IMAGES = [
    "img/healthbar/healthbar_frame_1.png",
    "img/healthbar/healthbar_frame_2.png",
    "img/healthbar/healthbar_frame_3.png",
    "img/healthbar/healthbar_frame_4.png",
    "img/healthbar/healthbar_frame_5.png",
    "img/healthbar/healthbar_frame_6.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.HEALTH_IMAGES);
    this.x = 50;
    this.y = 20;
    this.width = 47 * 7;
    this.height = 7 * 7;
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
    } else if (this.percentage >= 80) {
      return 1;
    } else if (this.percentage >= 60) {
      return 2;
    } else if (this.percentage >= 40) {
      return 3;
    } else if (this.percentage >= 20) {
      return 4;
    } else {
      return 5;
    }
  }
}
