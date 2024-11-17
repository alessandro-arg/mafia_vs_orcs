class Cloud extends MovableObject {
  y = 20;
  width = 200;
  height = 100;

  cloudImg = [
    "img/clouds/cloud_shape4_3.png",
    "img/clouds/cloud_shape4_4.png",
    "img/clouds/cloud_shape4_5.png",
  ];

  constructor() {
    super();
    const randomImage =
      this.cloudImg[Math.floor(Math.random() * this.cloudImg.length)];
    this.loadImage(randomImage);
    this.x = Math.random() * 1000;
  }
}
