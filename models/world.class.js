/**
 * Represents the game world, including the character, enemies, and game mechanics.
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  endboss;
  endbossHealthBar;
  statusBar = new Statusbar();
  ammoBar = new Ammobar();
  coinBar = new Coinbar();
  shootingBullet = [];
  playSounds = true;
  game_sound = new Audio("audio/game_song.mp3");
  end_fight_sound = new Audio("audio/bossfight.mp3");
  collecting_coin_sound = new Audio("audio/coin.mp3");
  collecting_ammo_sound = new Audio("audio/ammo.mp3");
  shot_sound = new Audio("audio/shot.mp3");
  dead_enemie_sound = new Audio("audio/enemies_dead.mp3");
  endboss_hurt_sound = new Audio("audio/endboss_hurt.mp3");
  animationFrameId = null;
  endbossDefeated = false;

  /**
   * Creates an instance of the World.
   * @param {HTMLCanvasElement} canvas The canvas element to render the game.
   * @param {Keyboard} keyboard The keyboard input object for character control.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    sounds.push(this.game_sound);
    sounds.push(this.end_fight_sound);
    sounds.push(this.collecting_coin_sound);
    sounds.push(this.collecting_ammo_sound);
    sounds.push(this.shot_sound);
    sounds.push(this.dead_enemie_sound);
    sounds.push(this.endboss_hurt_sound);
    this.setWorld();
    this.findEndboss();
    this.draw();
    this.run();
  }

  /**
   * Initializes the world and sets up the game environment.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Stops the game by canceling animation frames and clearing intervals.
   */
  stopGame() {
    cancelAnimationFrame(this.animationFrameId);
    clearInterval(this.intervalId1);
    clearInterval(this.intervalId2);
    clearInterval(this.intervalId3);
  }

  /**
   * Runs the main game loops to handle collisions, shooting, and game state updates.
   */
  run() {
    this.intervalId1 = setInterval(() => {
      this.checkCollisionsCharacterWithEnemie();
      if (this.character.energy > 0 || this.endboss.energy > 0) {
        this.setupGameMusic();
      }
      this.checkEndbossProximity();
    }, 300);

    this.intervalId2 = setInterval(() => {
      this.checkShootingObject();
    }, 100);

    this.intervalId3 = setInterval(() => {
      this.endbossHealthBar.update();
      this.checkCollisions();
      this.checkCollisionsEnemieWithBullet();
      this.checkCollisionsTopEnemie();
    }, 15);
  }

  /**
   * Plays the background game music if not already playing.
   */
  setupGameMusic() {
    const isMuted = localStorage.getItem("muted") === "true";
    if (!isMuted) {
      this.game_sound.loop = true;
      this.game_sound.volume = 0.1;
      this.game_sound.play();
    }
  }

  /**
   * Finds and sets up the endboss for the game.
   */
  findEndboss() {
    this.endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    this.endbossHealthBar = new StatusbarEndboss(this.endboss);
  }

  /**
   * Checks the proximity of the character to the endboss and handles related events.
   */
  checkEndbossProximity() {
    let distance = Math.abs(this.character.x - this.endboss.x);

    if (
      distance < 1000 &&
      this.endboss.energy > 0 &&
      this.character.energy > 0
    ) {
      this.handleProximityToEndboss();
    }

    if (this.character.energy <= 0) {
      this.handleCharacterDeath();
    } else if (this.endboss.energy <= 0) {
      this.handleEndbossDeath();
    }
  }

  /**
   * Handles actions when the character is near the endboss.
   */
  handleProximityToEndboss() {
    this.game_sound.pause();
    this.game_sound.loop = false;
    this.game_sound.volume = 0;

    if (!this.end_fight_sound.playing) {
      this.end_fight_sound.loop = true;
      this.end_fight_sound.play();
      this.end_fight_sound.volume = 0.2;
    }
  }

  /**
   * Handles character death, including sound effects and game state.
   */
  handleCharacterDeath() {
    this.end_fight_sound.pause();
    if (!this.character.gameOverSoundPlayed) {
      this.character.lose_sound.play();
      this.character.lose_sound.volume = 0.2;
      this.character.gameOverSoundPlayed = true;
      this.game_sound.pause();
    }
  }

  /**
   * Handles endboss death and triggers the victory sound.
   */
  handleEndbossDeath() {
    const isMuted = localStorage.getItem("muted") === "true";
    this.end_fight_sound.pause();
    this.game_sound.pause();
    if (!this.endboss.gameOverSoundPlayed) {
      setTimeout(() => {
        if (!isMuted) {
          this.endboss.victory_sound.play();
          this.endboss.victory_sound.volume = 0.2;
        }
        this.endboss.gameOverSoundPlayed = true;
      }, 1500);
    }
  }

  /**
   * Checks if the shooting conditions are met, and if so, starts shooting.
   */
  checkShootingObject() {
    if (this.checkShootingConditions()) {
      this.handleShootingStart();
      setTimeout(() => this.createBullet(), 100);
      setTimeout(() => this.resetShootingState(), 400);
    }
  }

  /**
   * Checks the conditions required to shoot.
   * @returns {boolean} True if shooting conditions are met.
   */
  checkShootingConditions() {
    return (
      this.keyboard.F &&
      this.character.ammo > 0 &&
      !this.character.otherDirection &&
      !this.character.isShooting
    );
  }

  /**
   * Starts the shooting action by setting the character state and playing the shooting sound.
   */
  handleShootingStart() {
    this.character.isShooting = true;
    this.character.ammo -= 1;
    this.ammoBar.setAmmunition(this.character.ammo);
    this.shot_sound.currentTime = 0;
    this.shot_sound.play();
    this.shot_sound.volume = 0.3;
  }

  /**
   * Creates a new bullet object when the character shoots.
   */
  createBullet() {
    this.character.playAnimationOnce(this.character.SHOOT_IMAGES);
    let bullet = new ShootedBullet(
      this.character.x + 160,
      this.character.y + 150
    );
    bullet.initialX = bullet.x;
    this.shootingBullet.push(bullet);
  }

  /**
   * Resets the character's shooting state after shooting.
   */
  resetShootingState() {
    this.character.isShooting = false;
  }

  /**
   * Checks for collisions between different game objects like ammo, coins, and enemies.
   */
  checkCollisions() {
    this.checkCollisionsAmmo();
    this.checkCollisionsCoin();
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollisionsCharacterWithEnemie() {
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        enemy.energy > 0 &&
        this.character.energy > 0
      ) {
        if (this.endbossDefeated) {
          return;
        }
        this.handleCollisionWithEnemy(enemy);
      }
    });
  }

  /**
   * Handles the actions to take when the character collides with an enemy.
   * @param {Enemy} enemy The enemy the character collides with.
   */
  handleCollisionWithEnemy(enemy) {
    this.character.wakeUp();
    this.playHurtSound();

    if (
      enemy.constructor.name === "Enemie" ||
      enemy.constructor.name === "Enemie2"
    ) {
      this.applyHitToCharacter();
    } else if (enemy.constructor.name === "Endboss") {
      this.handleCollisionWithEndboss(enemy);
    }
  }

  /**
   * Handles the collision with the endboss and applies damage if needed.
   * @param {Endboss} enemy The endboss the character collides with.
   */
  handleCollisionWithEndboss(enemy) {
    this.applyHitToCharacter();
    if (enemy.energy <= 50) {
      this.applyHitToCharacter();
    }
  }

  /**
   * Plays the hurt sound when the character is hurt by an enemy.
   */
  playHurtSound() {
    this.character.hurt_sound.currentTime = 0;
    this.character.hurt_sound.play();
    this.character.hurt_sound.volume = 0.1;
  }

  /**
   * Applies damage to the character when hit by an enemy.
   */
  applyHitToCharacter() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Checks for collisions between enemies and bullets.
   */
  checkCollisionsEnemieWithBullet() {
    for (
      let bulletIndex = 0;
      bulletIndex < this.shootingBullet.length;
      bulletIndex++
    ) {
      const bullet = this.shootingBullet[bulletIndex];

      for (
        let enemyIndex = 0;
        enemyIndex < this.level.enemies.length;
        enemyIndex++
      ) {
        const enemy = this.level.enemies[enemyIndex];

        if (this.isBulletCollidingWithEnemy(bullet, enemy)) {
          this.handleBulletCollision(bulletIndex, bullet, enemy);
        }
      }
    }
  }

  /**
   * Checks if a bullet collides with an enemy.
   * @param {Bullet} bullet The bullet being checked for collision.
   * @param {Enemy} enemy The enemy being checked for collision.
   * @returns {boolean} True if the bullet collides with the enemy.
   */
  isBulletCollidingWithEnemy(bullet, enemy) {
    return (
      bullet.isColliding(enemy) &&
      enemy.energy > 0 &&
      bullet.x <= bullet.initialX + 1280
    );
  }

  /**
   * Handles the actions when a bullet collides with an enemy.
   * @param {number} bulletIndex The index of the bullet in the shootingBullet array.
   * @param {Bullet} bullet The bullet that collided.
   * @param {Enemy} enemy The enemy that was hit.
   */
  handleBulletCollision(bulletIndex, bullet, enemy) {
    this.shootingBullet.splice(bulletIndex, 1);
    bulletIndex--;

    if (
      enemy.constructor.name === "Enemie" ||
      enemy.constructor.name === "Enemie2"
    ) {
      this.handleRegularEnemyCollision(enemy);
    } else if (enemy.constructor.name === "Endboss") {
      this.handleEndbossCollision(bullet, enemy);
    }
  }

  /**
   * Handles the collision with regular enemies when hit by a bullet.
   * @param {Enemy} enemy The enemy being hit by a bullet.
   */
  handleRegularEnemyCollision(enemy) {
    this.dead_enemie_sound.currentTime = 0;
    this.dead_enemie_sound.play();
    this.dead_enemie_sound.volume = 0.15;
    enemy.energy = 0;
    enemy.stopAtCurrentPosition();
  }

  /**
   * Handles the collision with the endboss when hit by a bullet.
   * @param {Bullet} bullet The bullet hitting the endboss.
   * @param {Endboss} enemy The endboss being hit.
   */
  handleEndbossCollision(bullet, enemy) {
    const headZone = enemy.y + enemy.height * 0.5;
    const damage = bullet.y < headZone ? 25 : 10;

    enemy.energy -= damage;
    this.endboss_hurt_sound.currentTime = 0;
    this.endboss_hurt_sound.play();
    this.endboss_hurt_sound.volume = 0.15;
    enemy.playHurtAnimation();
    this.endbossHealthBar.setPercentage(enemy.energy);

    if (enemy.energy <= 0) {
      enemy.energy = 0;
      enemy.stopAtCurrentPosition();
      this.endbossDefeated = true;
    }
  }

  /**
   * Checks for collisions between the character and coins.
   */
  checkCollisionsCoin() {
    this.level.coin.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collecting_coin_sound.currentTime = 0;
        this.collecting_coin_sound.play();
        this.collecting_coin_sound.volume = 0.1;
        this.level.coin.splice(index, 1);
        this.character.addCoin();
        this.coinBar.setCoin(this.character.coin);
      }
    });
  }

  /**
   * Checks for collisions between the character and ammo.
   */
  checkCollisionsAmmo() {
    this.level.ammo.forEach((ammo, index) => {
      if (this.character.isColliding(ammo)) {
        this.collecting_ammo_sound.currentTime = 0;
        this.collecting_ammo_sound.play();
        this.collecting_ammo_sound.volume = 0.1;
        this.level.ammo.splice(index, 1);
        this.character.addAmmo();
        this.ammoBar.setAmmunition(this.character.ammo);
      }
    });
  }

  /**
   * Checks for collisions between the character and the top of enemies.
   */
  checkCollisionsTopEnemie() {
    let hasBounced = false;

    this.level.enemies.forEach((enemy) => {
      if (this.isCharacterCollidingWithEnemyTop(enemy)) {
        hasBounced = this.handleEnemyBounce(enemy);
      }
    });
  }

  /**
   * Checks if the character is colliding with the top of an enemy.
   * @param {Enemy} enemy The enemy being checked.
   * @returns {boolean} True if the character is colliding with the top of the enemy.
   */
  isCharacterCollidingWithEnemyTop(enemy) {
    const enemyTop = enemy.y + enemy.offset.top;
    const enemyLeft = enemy.x + enemy.offset.left;
    const enemyRight = enemy.x + enemy.width - enemy.offset.right;

    const charBottom =
      this.character.y + this.character.height - this.character.offset.bottom;
    const charCenterX = this.character.x + this.character.width * 0.5;

    return (
      charBottom <= enemyTop &&
      charCenterX > enemyLeft &&
      charCenterX < enemyRight &&
      this.character.speedY >= -30 &&
      !this.character.isBouncing
    );
  }

  /**
   * Handles the bounce effect when the character collides with an enemy from above.
   * @param {Enemy} enemy The enemy being collided with.
   * @returns {boolean} True if the character bounced off the enemy.
   */
  handleEnemyBounce(enemy) {
    let hasBounced = false;

    if (
      (enemy.constructor.name === "Enemie" ||
        enemy.constructor.name === "Enemie2") &&
      enemy.energy > 0
    ) {
      enemy.energy = 0;
      enemy.stopAtCurrentPosition();
      this.dead_enemie_sound.play();
      this.dead_enemie_sound.volume = 0.2;
      this.character.bounceOffEnemy();
      hasBounced = true;
    }

    return hasBounced;
  }

  /**
   * Draws the game world on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addBackgroundToMap();
    this.addBarsToMap();
    this.addEnemiesAndObjectsToMap();

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds the background objects to the map.
   */
  addBackgroundToMap() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.shootingBullet);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds bars like health, ammo, and coins to the map.
   */
  addBarsToMap() {
    this.addToMap(this.statusBar);
    this.addToMap(this.ammoBar);
    this.addToMap(this.coinBar);
  }

  /**
   * Adds enemies and objects to the map.
   */
  addEnemiesAndObjectsToMap() {
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.ammo);
    this.addObjectsToMap(this.level.coin);
    if (this.endbossHealthBar) {
      this.endbossHealthBar.update();
      this.addToMap(this.endbossHealthBar);
    }
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Adds a list of objects to the map.
   * @param {Array} objects The array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map.
   * @param {MovableObject} movableObject The object to be added.
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);

    if (movableObject.otherDirection) {
      this.resetFlipImage(movableObject);
    }
  }

  /**
   * Flips the image of a movable object (for character movement).
   * @param {MovableObject} movableObject The object to flip.
   */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**
   * Resets the image flip for a movable object.
   * @param {MovableObject} movableObject The object to reset.
   */
  resetFlipImage(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}
