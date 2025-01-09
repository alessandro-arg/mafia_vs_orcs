class Coin extends MovableObject {
  y = 550;
  width = 70;
  height = 70;

  COIN_IMAGES = [
    "img/coin/coin_frame1.png",
    "img/coin/coin_frame2.png",
    "img/coin/coin_frame3.png",
    "img/coin/coin_frame4.png",
    "img/coin/coin_frame5.png",
  ];

  constructor() {
    super().loadImage("img/coin/coin_frame1.png");
    this.loadImages(this.COIN_IMAGES);
    this.x = 1000 + Math.random() * 2000;
    this.y = 500 + Math.random() * -300;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.COIN_IMAGES);
    }, 150);
  }
}
