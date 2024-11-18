class Cloud extends MovableObject {
  y = 20;
  width = 143;
  height = 50;

  cloudImg = [
    "img/clouds/clouds_shape8_3.png",
    "img/clouds/clouds_shape8_4.png",
    "img/clouds/clouds_shape8_5.png",
  ];

  constructor() {
    super();
    const randomImage =
      this.cloudImg[Math.floor(Math.random() * this.cloudImg.length)];
    this.loadImage(randomImage);
    this.x = Math.random() * 1000;
    this.animate(0.15);
  }
}
