/**
 * Represents a cloud object in the game.
 * Inherits from MovableObject and moves across the screen.
 */
class Cloud extends MovableObject {
  y = 20;
  width = 143;
  height = 50;

  cloudImg = [
    "img/clouds/clouds_shape8_3.png",
    "img/clouds/clouds_shape8_4.png",
    "img/clouds/clouds_shape8_5.png",
  ];

  /**
   * Creates a new Cloud object.
   * Selects a random image from 'cloudImg' and sets a random x-position.
   */
  constructor() {
    super();
    const randomImage =
      this.cloudImg[Math.floor(Math.random() * this.cloudImg.length)];
    this.loadImage(randomImage);
    this.x = Math.random() * 1000;
    this.animate(0.15);
  }
}
