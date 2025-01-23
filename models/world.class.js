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
  animationFrameId = null;

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
    this.setWorld();
    this.findEndboss();
    this.draw();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  stopGame() {
    cancelAnimationFrame(this.animationFrameId);
    clearAllIntervals();
  }

  run() {
    setInterval(() => {
      this.checkCollisionsCharacterWithEnemie();
      if (this.character.energy > 0 || this.endboss.energy > 0) {
        this.setupGameMusic();
      }
      this.checkEndbossProximity();
    }, 300);

    setInterval(() => {
      this.checkShootingObject();
    }, 100);

    setInterval(() => {
      this.endbossHealthBar.update();
      this.checkCollisions();
      this.checkCollisionsEnemieWithBullet();
      this.checkCollisionsTopEnemie();
    }, 15);
  }

  setupGameMusic() {
    this.game_sound.loop = true;
    this.game_sound.play();
    this.game_sound.volume = 0.2;
  }

  findEndboss() {
    this.endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    this.endbossHealthBar = new StatusbarEndboss(this.endboss);
  }

  checkEndbossProximity() {
    if (!this.endboss) return;

    let distance = Math.abs(this.character.x - this.endboss.x);

    if (
      distance < 1200 &&
      this.endboss.energy > 0 &&
      this.character.energy > 0
    ) {
      if (!this.end_fight_sound.playing) {
        this.game_sound.pause();
        this.end_fight_sound.loop = true;
        this.end_fight_sound.play();
        this.end_fight_sound.volume = 0.2;
      }
    }

    if (this.character.energy <= 0) {
      this.end_fight_sound.pause();
      if (!this.character.gameOverSoundPlayed) {
        this.character.lose_sound.play();
        this.character.lose_sound.volume = 0.3;
        this.character.gameOverSoundPlayed = true;
      }
    } else if (this.endboss.energy <= 0) {
      this.end_fight_sound.pause();
      if (!this.endboss.gameOverSoundPlayed) {
        setTimeout(() => {
          this.endboss.victory_sound.play();
          this.endboss.victory_sound.volume = 0.3;
          this.endboss.gameOverSoundPlayed = true;
        }, 2000);
      }
    }
  }

  checkShootingObject() {
    if (
      this.keyboard.F &&
      this.character.ammo > 0 &&
      !this.character.otherDirection &&
      !this.character.isShooting
    ) {
      this.character.isShooting = true;
      this.character.ammo -= 1;
      this.ammoBar.setAmmunition(this.character.ammo);
      this.shot_sound.currentTime = 0;
      this.shot_sound.play();
      this.shot_sound.volume = 0.4;

      setTimeout(() => {
        this.character.playAnimationOnce(this.character.SHOOT_IMAGES);
        let bullet = new ShootedBullet(
          this.character.x + 160,
          this.character.y + 150
        );
        this.shootingBullet.push(bullet);
      }, 100);

      setTimeout(() => {
        this.character.isShooting = false;
      }, 400);
    }
  }

  checkCollisions() {
    this.checkCollisionsAmmo();
    this.checkCollisionsCoin();
  }

  checkCollisionsCharacterWithEnemie() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && enemy.energy > 0) {
        this.character.wakeUp();
        this.character.hurt_sound.currentTime = 0;
        this.character.hurt_sound.play();
        this.character.hurt_sound.volume = 0.1;

        if (
          enemy.constructor.name == "Enemie" ||
          enemy.constructor.name == "Enemie2"
        ) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        } else if (enemy.constructor.name == "Endboss") {
          this.character.hit();
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }

        if (
          enemy.constructor.name == "Endboss" &&
          this.character.energy <= 0 &&
          enemy.energy > 0
        ) {
          this.character.hurt_sound.pause();
          enemy.stopAtCurrentPosition();
          enemy.playLoseAnimation();
        }
      }
    });
  }

  checkCollisionsEnemieWithBullet() {
    const bulletsToRemove = new Set();
    this.shootingBullet.forEach((bullet, bulletIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bullet.isColliding(enemy) && enemy.energy > 0) {
          bulletsToRemove.add(bulletIndex);

          if (
            enemy.constructor.name == "Enemie" ||
            enemy.constructor.name == "Enemie2"
          ) {
            this.dead_enemie_sound.currentTime = 0;
            this.dead_enemie_sound.play();
            this.dead_enemie_sound.volume = 0.15;
            enemy.energy = 0;
            enemy.stopAtCurrentPosition();
          } else if (enemy.constructor.name == "Endboss") {
            let headZone = enemy.y + enemy.height * 0.5;

            if (bullet.y < headZone) {
              enemy.energy -= 20;
            } else {
              enemy.energy -= 10;
            }
            enemy.playHurtAnimation();
            this.endbossHealthBar.setPercentage(enemy.energy);
            console.log("Endboss health =", enemy.energy);

            if (enemy.energy <= 0) {
              enemy.energy = 0;
              enemy.stopAtCurrentPosition();
            }
          }
        }
      });
    });

    [...bulletsToRemove]
      .sort((a, b) => b - a)
      .forEach((index) => {
        this.shootingBullet.splice(index, 1);
      });
  }

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

  checkCollisionsTopEnemie() {
    let hasBounced = false;

    this.level.enemies.forEach((enemy) => {
      let enemyTop = enemy.y + enemy.offset.top;
      let enemyLeft = enemy.x + enemy.offset.left;
      let enemyRight = enemy.x + enemy.width - enemy.offset.right;

      let charBottom =
        this.character.y + this.character.height - this.character.offset.bottom;
      let charCenterX = this.character.x + this.character.width * 0.5;

      if (
        charBottom <= enemyTop &&
        charCenterX > enemyLeft &&
        charCenterX < enemyRight &&
        this.character.speedY >= -30 &&
        !this.character.isBouncing
      ) {
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
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.shootingBullet);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.ammoBar);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.ammo);
    this.addObjectsToMap(this.level.coin);

    if (this.endbossHealthBar) {
      this.endbossHealthBar.update();
      this.addToMap(this.endbossHealthBar);
    }

    this.ctx.translate(-this.camera_x, 0);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);
    // movableObject.drawFrame(this.ctx);

    if (movableObject.otherDirection) {
      this.resetFlipImage(movableObject);
    }
  }

  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  resetFlipImage(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}
