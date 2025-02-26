/**
 * Represents a shot bullet object that inherits from MovableObject.
 * The bullet moves horizontally with a specified speed and can trigger an explosion animation.
 */
class ShootedBullet extends MovableObject {
  width = 66 / 2.5;
  height = 25 / 2.5;
  speedX = 40;

  /**
   * Creates an instance of the ShootedBullet.
   * @param {number} x - The starting x-coordinate of the bullet.
   * @param {number} y - The starting y-coordinate of the bullet.
   */
  constructor(x, y) {
    super().loadImage("img/bullet/bullet.png");
    this.x = x;
    this.y = y;
    this.applyGravity = false;
    this.animate();
  }

  /**
   * Animates the bullet by moving it horizontally.
   * The bullet moves continuously at a set speed along the x-axis.
   * @returns {void}
   */
  animate() {
    setInterval(() => {
      this.x += this.speedX;
    }, 1000 / 60);
  }
}
