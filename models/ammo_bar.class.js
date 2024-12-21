class Ammobar extends DrawableObject {
  AMMO_IMAGES = [
    "img/ammobar/ammo_bar_frame_0.png",
    "img/ammobar/ammo_bar_frame_1.png",
    "img/ammobar/ammo_bar_frame_2.png",
    "img/ammobar/ammo_bar_frame_3.png",
    "img/ammobar/ammo_bar_frame_4.png",
    "img/ammobar/ammo_bar_frame_5.png",
  ];

  ammunition = 0;

  constructor() {
    super();
    this.loadImages(this.AMMO_IMAGES);
    this.x = 30;
    this.y = 20;
    this.width = 3425 / 15;
    this.height = 917 / 15;
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
    } else if (this.ammunition == 1) {
      return 1;
    } else if (this.ammunition == 2) {
      return 2;
    } else if (this.ammunition == 3) {
      return 3;
    } else if (this.ammunition == 4) {
      return 4;
    } else {
      return 5;
    }
  }
}
