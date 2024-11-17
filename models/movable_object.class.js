class MovableObject {
  x = 50;
  y = 350;
  img;
  height = 300;
  width = 250;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("moving right..");
  }
}
