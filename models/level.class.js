class Level {
  enemies;
  clouds;
  backgroundObjects;
  ammo;
  coin;
  level_end_x = 3500;

  constructor(enemies, clouds, ammo, coin, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.ammo = ammo;
    this.coin = coin;
  }
}
