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
  //   game_sound = new Audio('');
  //   collecting_coin_sound = new Audio('');
  //   collecting_ammo_sound = new Audio('');
  //   hurt_sound = new Audio('');
  //   dead_enemie_sound = new Audio('');
  animationFrameId = null;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
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

  findEndboss() {
    this.endboss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
    this.endbossHealthBar = new StatusbarEndboss(this.endboss);
  }

  checkShootingObject() {
    if (
      this.keyboard.F &&
      this.character.ammo > 0 &&
      !this.character.otherDirection
    ) {
      this.character.wakeUp();
      // this.playAnimationOnce(this.character.SHOOT_IMAGES);
      let bullet = new ShootedBullet(
        this.character.x + 160,
        this.character.y + 90
      );
      this.character.ammo -= 1;
      this.ammoBar.setAmmunition(this.character.ammo);
      this.shootingBullet.push(bullet);
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
        // this.playSound(this.hurt_sound);
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsEnemieWithBullet() {
    const bulletsToRemove = new Set();

    this.shootingBullet.forEach((bullet, bulletIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (bullet.isColliding(enemy) && enemy.energy > 0) {
          bulletsToRemove.add(bulletIndex);
          // bullet.playAnimation(bullet.EXPLOSION_IMAGES);
          // this.playSound(this.dead_enemie_sound);
          if (
            enemy.constructor.name == "Enemie" ||
            enemy.constructor.name == "Enemie2"
          ) {
            enemy.energy = 0;
            enemy.stopAtCurrentPosition();
          } else if (enemy.constructor.name == "Endboss") {
            if (enemy.energy >= 20) {
              enemy.playHurtAnimation();
              enemy.energy -= 20;
              this.endbossHealthBar.setPercentage(enemy.energy);
              if (enemy.energy <= 0) {
                enemy.energy = 0;
                enemy.stopAtCurrentPosition();
              }
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
        this.level.coin.splice(index, 1);
        // this.playSound(this.collecting_coin_sound);
        this.character.addCoin();
        this.coinBar.setCoin(this.character.coin);
      }
    });
  }

  checkCollisionsAmmo() {
    this.level.ammo.forEach((ammo, index) => {
      if (this.character.isColliding(ammo)) {
        this.level.ammo.splice(index, 1);
        this.character.addAmmo();
        // this.playSound(this.collecting_ammo_sound);
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
          // this.playSound(this.dead_enemie_sound);
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

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.ammoBar);
    this.addToMap(this.coinBar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.ammo);
    this.addObjectsToMap(this.level.coin);
    this.addObjectsToMap(this.shootingBullet);

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

  // async playSound(sound) {
  //   if (this.playSounds) {
  //     await sound.play();
  //   }
  // }
}
