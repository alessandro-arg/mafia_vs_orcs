/**
 * Represents the coin bar in the game, displaying the player's collected coins.
 * Inherits from DrawableObject.
 */
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

  /**
   * Creates a new Coinbar object.
   * Initializes position, size, and loads images.
   */
  constructor() {
    super();
    this.loadImages(this.COIN_IMAGES);
    this.x = 20;
    this.y = 180;
    this.width = 3425 / 20;
    this.height = 917 / 20;
    this.setCoin(0);
  }

  /**
   * Updates the coin count and changes the displayed image accordingly.
   * @param {number} coin - The current coin count.
   */
  setCoin(coin) {
    this.coin = coin;
    let path = this.COIN_IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the appropriate image index based on the number of collected coins.
   * @returns {number} The index of the image in COIN_IMAGES.
   */
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
