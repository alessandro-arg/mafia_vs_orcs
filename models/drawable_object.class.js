/**
 * Base class for all drawable objects in the game.
 * Provides methods for loading images and rendering them on a canvas.
 */
class DrawableObject {
  x = 50;
  y = 330;
  width;
  height;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Loads a single image and assigns it to the object.
   * @param {string} path - The file path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images into the image cache.
   * @param {string[]} array - An array of image paths to preload.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws the object onto a given canvas rendering context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
