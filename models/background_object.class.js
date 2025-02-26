/**
 * Represents a background object in the game.
 * Inherits properties and methods from MovableObject.
 */
class BackgroundObject extends MovableObject {
  width = 1280;
  height = 720;

  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 720 - this.height;
  }
}
