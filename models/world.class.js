class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  ammoBar = new Ammobar();
  coinBar = new Coinbar();
  shootingBullet = [];
  fullscreenIcon = new Image();
  fullscreenIconPosition = { x: 0, y: 0, width: 50, height: 50 };
  isFullscreen = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.fullscreenIcon.src = "./img/fullscreen/fullscreen_icon.png";
    this.setWorld();
    this.draw();
    this.addEventListeners();
    this.checkCollisions();
    this.checkCollisionsAmmo();
    this.checkCollisionsCoin();
    this.checkShootingObject();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusBar.setPercentage(this.character.energy);
        }
      });
    }, 500);
  }

  checkShootingObject() {
    setInterval(() => {
      if (this.keyboard.F) {
        let bullet = new ShootedBullet(
          this.character.x + 160,
          this.character.y + 90
        );
        this.shootingBullet.push(bullet);
      }
    }, 100);
  }

  checkCollisionsAmmo() {
    setInterval(() => {
      this.level.ammo = this.level.ammo.filter((ammo) => {
        if (this.character.isColliding(ammo)) {
          this.character.addAmmo();
          this.ammoBar.setAmmunition(this.character.ammo);
          return false;
        }
        return true;
      });
    }, 100);
  }

  checkCollisionsCoin() {
    setInterval(() => {
      this.level.coin = this.level.coin.filter((coin) => {
        if (this.character.isColliding(coin)) {
          this.character.addCoin();
          this.coinBar.setCoin(this.character.coin);
          return false;
        }
        return true;
      });
    }, 100);
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

    this.ctx.translate(-this.camera_x, 0);

    if (!this.isFullscreen) {
      this.fullscreenIconPosition.x = this.canvas.width - 60;
      this.fullscreenIconPosition.y = this.canvas.height - 60;
      this.ctx.drawImage(
        this.fullscreenIcon,
        this.fullscreenIconPosition.x,
        this.fullscreenIconPosition.y,
        this.fullscreenIconPosition.width,
        this.fullscreenIconPosition.height
      );
    }

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
    movableObject.drawFrame(this.ctx);

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

  addEventListeners() {
    this.canvas.addEventListener("click", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const { x: fx, y: fy, width, height } = this.fullscreenIconPosition;
      if (
        !this.isFullscreen &&
        x >= fx &&
        x <= fx + width &&
        y >= fy &&
        y <= fy + height
      ) {
        this.requestFullscreen();
      }
    });

    document.addEventListener("fullscreenchange", () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  }

  requestFullscreen() {
    if (this.canvas.requestFullscreen) {
      this.canvas.requestFullscreen();
    } else if (this.canvas.webkitRequestFullscreen) {
      this.canvas.webkitRequestFullscreen();
    } else if (this.canvas.msRequestFullscreen) {
      this.canvas.msRequestFullscreen();
    }
  }
}
