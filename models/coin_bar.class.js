class Coinbar extends DrawableObject {
  COIN_IMAGES = [
    "img/coin_counter/coin_bar_0.png",
    "img/coin_counter/coin_bar_1.png",
    "img/coin_counter/coin_bar_2.png",
    "img/coin_counter/coin_bar_3.png",
    "img/coin_counter/coin_bar_4.png",
    "img/coin_counter/coin_bar_5.png",
  ];

  coin = 0;

  constructor() {
    super();
    this.loadImages(this.COIN_IMAGES);
    this.x = 20;
    this.y = 180;
    this.width = 3425 / 18;
    this.height = 917 / 18;
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
    } else if (this.coin == 4) {
      return 4;
    } else {
      return 5;
    }
  }
}
