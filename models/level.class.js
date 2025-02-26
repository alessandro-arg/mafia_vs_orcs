/**
 * Represents a game level, containing enemies, clouds, ammo, coins, and background objects.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  ammo;
  coin;
  level_end_x = 1280 * 6;

  /**
   * Creates a new Level instance.
   * @param {Enemie[]} enemies - The enemies present in the level.
   * @param {Cloud[]} clouds - The clouds present in the level.
   * @param {Ammo[]} ammo - The ammo pickups in the level.
   * @param {Coin[]} coin - The coin pickups in the level.
   * @param {BackgroundObject[]} backgroundObjects - The background objects in the level.
   */
  constructor(enemies, clouds, ammo, coin, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.ammo = ammo;
    this.coin = coin;
  }
}
