class Level {
  enemies;
  clouds;
  backgroundObjects;
  ammo;
  level_end_x = 3500;

  constructor(enemies, clouds, ammo, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.ammo = ammo;
  }
}
