class ShootedBullet extends MovableObject {
  width = 66 / 2.5;
  height = 25 / 2.5;

  constructor(x, y) {
    super().loadImage("img/bullet/bullet.png");
    this.x = x;
    this.y = y;
    this.shoot();
  }

  shoot() {
    this.speedY = 30;
    setInterval(() => {
      this.x += 30;
    }, 25);
  }
}
