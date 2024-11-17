class Cloud extends MovableObject {
  width = 200;
  height = 130;

  constructor() {
    super().loadImage("img/clouds/cloud_shape4_1.png");
    this.x = Math.random() * 1000;
    this.y = 20;
  }
}
