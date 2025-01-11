class MovableObject extends DrawableObject {
  speed = 7;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  ammo = 0;
  coin = 0;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ShootedBullet) {
      return true;
    } else {
      return this.y < 450;
    }
  }

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

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  addAmmo() {
    this.ammo += 1;
    if (this.ammo >= 5) {
      this.ammo = 5;
    }
  }

  addCoin() {
    this.coin += 1;
    if (this.coin >= 10) {
      this.coin = 10;
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  isDead() {
    return this.energy == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

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

  animate(time) {
    setInterval(() => {
      this.x -= time;
    }, 1000 / 60);
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
