/**
 * Represents a health status bar that visually displays the current health percentage.
 * The status bar changes its image based on the health percentage and is drawn on the screen.
 */
class Statusbar extends DrawableObject {
  HEALTH_IMAGES = [
    "img/healthbar/healthbar_frame_1.png",
    "img/healthbar/healthbar_frame_2.png",
    "img/healthbar/healthbar_frame_3.png",
    "img/healthbar/healthbar_frame_4.png",
    "img/healthbar/healthbar_frame_5.png",
    "img/healthbar/healthbar_frame_6.png",
  ];

  percentage = 100;

  /**
   * Creates an instance of the Statusbar.
   * Initializes the position, size, and default health percentage (100%).
   * @returns {void}
   */
  constructor() {
    super();
    this.loadImages(this.HEALTH_IMAGES);
    this.x = 20;
    this.y = 20;
    this.width = 47 * 7;
    this.height = 7 * 7;
    this.setPercentage(100);
  }

  /**
   * Sets the health percentage and updates the displayed image.
   * The health bar image will change according to the new percentage.
   * @param {number} percentage - The new health percentage (0 to 100).
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
}
