class ShootedBullet extends MovableObject {
  width = 66 / 2.5;
  height = 25 / 2.5;
  speedX = 40;

  EXPLOSION_IMAGES = [];

  constructor(x, y) {
    super().loadImage("img/bullet/bullet.png");
    this.loadImages(this.EXPLOSION_IMAGES);
    this.x = x;
    this.y = y;
    this.applyGravity = false;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x += this.speedX;
    }, 1000 / 60);
  }
}
