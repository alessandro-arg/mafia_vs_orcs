class MovableObject {
  x = 50;
  y = 330;
  speed = 7;
  img;
  currentImage = 0;
  imageCache = {};
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 450;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Enemie) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(object) {
    return (
      this.x + this.width > object.x &&
      this.x < object.x &&
      this.y + this.height > object.y &&
      this.y < object.y + object.height
    );
  }

  hit() {
    if (this.energy > 0) {
      this.energy -= 20;
      console.log("Energy after collision:", this.energy);
    }
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
