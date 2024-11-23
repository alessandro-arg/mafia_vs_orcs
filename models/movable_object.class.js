class MovableObject {
  x = 50;
  y = 330;
  img;
  currentImage = 0;
  imageCache = {};
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 315;
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
    this.otherDirection = false;
    this.walking_sound.play();
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
    this.walking_sound.play();
  }

  jump() {
    this.speedY = 30;
  }
}
