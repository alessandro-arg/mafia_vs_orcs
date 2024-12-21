class Coinbar extends DrawableObject {
  COIN_IMAGES = [
    "img/healthbar/healthbar_frame_1.png",
    "img/healthbar/healthbar_frame_2.png",
    "img/healthbar/healthbar_frame_3.png",
    "img/healthbar/healthbar_frame_4.png",
    "img/healthbar/healthbar_frame_5.png",
  ];

  coin = 0;

  constructor() {
    super();
    this.loadImages(this.COIN_IMAGES);
    this.x = 40;
    this.y = 140;
    this.width = 47 * 5;
    this.height = 7 * 5;
    this.setCoin(0);
  }

  setCoin(coin) {
    this.coin = coin;
    let path = this.COIN_IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.coin == 0) {
      return 0;
    } else if (this.coin == 1) {
      return 1;
    } else if (this.coin == 2) {
      return 2;
    } else if (this.coin == 3) {
      return 3;
    } else {
      return 4;
    }
  }
}
