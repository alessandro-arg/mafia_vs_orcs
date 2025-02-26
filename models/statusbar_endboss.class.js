/**
 * Represents the health status bar for the endboss.
 * The status bar visually displays the endboss's current health percentage,
 * updating its image based on the health level and following the endboss's position.
 */
class StatusbarEndboss extends DrawableObject {
  HEALTH_IMAGES = [
    "img/boss/healthbar/boss_healthbar_1.png",
    "img/boss/healthbar/boss_healthbar_2.png",
    "img/boss/healthbar/boss_healthbar_3.png",
    "img/boss/healthbar/boss_healthbar_4.png",
    "img/boss/healthbar/boss_healthbar_5.png",
    "img/boss/healthbar/boss_healthbar_6.png",
  ];

  percentage = 100;

  /**
   * Creates an instance of the StatusbarEndboss.
   * Initializes the health bar's position and size, and sets the endboss reference.
   * @param {Object} endboss - The endboss object to which this health bar is associated.
   * @returns {void}
   */
  constructor(endboss) {
    super();
    this.endboss = endboss || null;
    this.loadImages(this.HEALTH_IMAGES);
    this.width = 320;
    this.height = 68;
    this.setPercentage(100);
    this.update();
  }

  /**
   * Sets the health percentage of the endboss and updates the health bar image accordingly.
   * @param {number} percentage - The new health percentage of the endboss (0 to 100).
   * @returns {void}
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.HEALTH_IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the current health percentage.
   * The index corresponds to different health ranges:
   * - 100%: index 0
   * - 80-100%: index 1
   * - 60-80%: index 2
   * - 40-60%: index 3
   * - 20-40%: index 4
   * - 0-20%: index 5
   * @returns {number} The index of the appropriate image for the current health percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 0;
    } else if (this.percentage >= 80) {
      return 1;
    } else if (this.percentage >= 60) {
      return 2;
    } else if (this.percentage >= 40) {
      return 3;
    } else if (this.percentage >= 20) {
      return 4;
    } else {
      return 5;
    }
  }

  /**
   * Updates the position of the health bar based on the endboss's position.
   * The health bar will be positioned above the endboss at a fixed offset.
   * @returns {void}
   */
  update() {
    if (this.endboss) {
      this.x = this.endboss.x + this.endboss.width / 2 - this.width / 2.5;
      this.y = this.endboss.y + 50;
    }
  }
}
