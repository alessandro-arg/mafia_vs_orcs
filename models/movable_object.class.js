class MovableObject {
  x = 50;
  y = 330;
  img;
  currentImage = 0;
  imageCache = {};
  otherDirection = false;

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

  animate(time) {
    setInterval(() => {
      this.x -= time;
    }, 1000 / 60);
  }

  moveRight() {
    console.log("moving right..");
  }
}
