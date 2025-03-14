/**
 * Represents a movable object in the game.
 * Inherits from the DrawableObject class and includes properties and methods for movement, collision detection, animation, and more.
 */
class MovableObject extends DrawableObject {
  speed = 7;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  ammo = 0;
  coin = 0;
  lastHit = 0;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Applies gravity to the object, affecting its vertical movement.
   * @returns {void}
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ShootedBullet) {
      return true;
    } else {
      return this.y < 395;
    }
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {Object} object - The other object to check for collision.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(object) {
    return (
      this.x + this.width - this.offset.right > object.x + object.offset.left &&
      this.y + this.height - this.offset.bottom >
        object.y + object.offset.top &&
      this.x + this.offset.left <
        object.x + object.width - object.offset.right &&
      this.y + this.offset.top < object.y + object.height - object.offset.bottom
    );
  }

  /**
   * Decreases the object's energy when it is hit.
   * If energy reaches 0, it will remain at 0.
   * @returns {void}
   */
  hit() {
    this.energy -= 20;
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Increases the object's ammo by 1, but not exceeding 5.
   * @returns {void}
   */
  addAmmo() {
    this.ammo += 1;
    if (this.ammo >= 5) {
      this.ammo = 5;
    }
  }

  /**
   * Increases the object's coin count by 1, but not exceeding 10.
   * @returns {void}
   */
  addCoin() {
    this.coin += 1;
    if (this.coin >= 10) {
      this.coin = 10;
    }
  }

  /**
   * Checks if the object was recently hurt.
   * @returns {boolean} True if the object was hurt in the last 0.5 seconds, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
   * Checks if the object is dead (energy is 0).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    if (this.energy <= 0) {
      return this.energy == 0;
    } else {
      return this.energy == 0;
    }
  }

  /**
   * Plays the animation for the object by cycling through an array of images.
   * @param {string[]} images - An array of image paths for the animation.
   * @returns {void}
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Plays the animation once, stopping at the last image in the array.
   * @param {string[]} images - An array of image paths for the animation.
   * @returns {void}
   */
  playAnimationOnce(images) {
    let i = this.currentImage % images.length;
    let path = images[i];

    if (i === images.length - 1) {
      this.isDeadAnimationComplete = true;
      this.img = this.imageCache[path];
    } else {
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  }

  /**
   * Animates the object by moving it over time.
   * @param {number} time - The amount of time to move the object by.
   * @returns {void}
   */
  animate(time) {
    setInterval(() => {
      this.x -= time;
    }, 1000 / 60);
  }

  /**
   * Moves the object to the right by its speed.
   * @returns {void}
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed.
   * @returns {void}
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   * @returns {void}
   */
  jump() {
    this.speedY = 30;
  }
}
