class Ammobar extends DrawableObject {
  AMMO_IMAGES = [
    "img/ammobar/empty_bar.png",
    "img/ammobar/2_bullets.png",
    "img/ammobar/4_bullets.png",
    "img/ammobar/6_bullets.png",
    "img/ammobar/8_bullets.png",
  ];

  ammunition = 0;

  constructor() {
    super();
    this.loadImages(this.AMMO_IMAGES);
    this.x = 40;
    this.y = 60;
    this.width = 47 * 5;
    this.height = 7 * 5;
    this.setAmmunition(0);
  }

  setAmmunition(ammunition) {
    this.ammunition = ammunition;
    let path = this.AMMO_IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.ammunition == 0) {
      return 0;
    } else if (this.ammunition == 2) {
      return 1;
    } else if (this.ammunition == 4) {
      return 2;
    } else if (this.ammunition == 6) {
      return 3;
    } else {
      return 4;
    }
  }
}
