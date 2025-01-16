class StatusbarEndboss extends DrawableObject {
  HEALTH_IMAGES = [
    "img/healthbar/healthbar_frame_1.png",
    "img/healthbar/healthbar_frame_2.png",
    "img/healthbar/healthbar_frame_3.png",
    "img/healthbar/healthbar_frame_4.png",
    "img/healthbar/healthbar_frame_5.png",
    "img/healthbar/healthbar_frame_6.png",
  ];

  percentage = 100;

  constructor(endboss) {
    super();
    this.endboss = endboss || null;
    this.loadImages(this.HEALTH_IMAGES);
    this.width = 47 * 7;
    this.height = 7 * 7;
    this.setPercentage(100);
    this.update();
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

  update() {
    if (this.endboss) {
      this.x = this.endboss.x + this.endboss.width / 2 - this.width / 2.5;
      this.y = this.endboss.y + 50;
    }
  }
}
