class World {
  character = new Character();
  enemies = [new Enemie(), new Enemie(), new Enemie()];
  clouds = [new Cloud(), new Cloud(), new Cloud(), new Cloud(), new Cloud()];
  backgroundObjects = [
    new BackgroundObject("img/object_bg/sky.png", 0),
    new BackgroundObject("img/object_bg/houses.png", 0),
    new BackgroundObject("img/object_bg/houses2.png", 0),
    new BackgroundObject("img/object_bg/houses1.png", 0),
    new BackgroundObject("img/object_bg/fountain&bush.png", 0),
    new BackgroundObject("img/object_bg/umbrella&policebox.png", 0),
    new BackgroundObject("img/object_bg/road.png", 0),
  ];
  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(movableObject) {
    this.ctx.drawImage(
      movableObject.img,
      movableObject.x,
      movableObject.y,
      movableObject.width,
      movableObject.height
    );
  }
}
