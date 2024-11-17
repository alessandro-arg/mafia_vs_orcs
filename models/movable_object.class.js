class MovableObject {
  x = 120;
  y = 150;
  img;
  height = 500;
  width = 350;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("moving right..");
  }
}
