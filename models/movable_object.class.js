class MovableObject {
  x = 50;
  y = 330;
  img;
  height = 350;
  width = 350;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("moving right..");
  }
}
