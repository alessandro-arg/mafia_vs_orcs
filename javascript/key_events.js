document.addEventListener("keydown", (event) => {
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (event.keyCode == 38) {
    keyboard.UP = true;
  }

  if (event.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (event.keyCode == 70) {
    keyboard.F = true;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (event.keyCode == 38) {
    keyboard.UP = false;
  }

  if (event.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (event.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (event.keyCode == 70) {
    keyboard.F = false;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let btnLeft = document.getElementById("btnLeft");
  let btnRight = document.getElementById("btnRight");
  let btnJump = document.getElementById("btnJump");
  let btnShot = document.getElementById("btnShot");

  btnLeft.addEventListener("touchstart", () => {
    keyboard.LEFT = true;
  });

  btnLeft.addEventListener("touchend", () => {
    keyboard.LEFT = false;
  });

  btnRight.addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
  });

  btnRight.addEventListener("touchend", () => {
    keyboard.RIGHT = false;
  });

  btnJump.addEventListener("touchstart", () => {
    keyboard.SPACE = true;
  });

  btnJump.addEventListener("touchend", () => {
    keyboard.SPACE = false;
  });

  btnShot.addEventListener("touchstart", () => {
    keyboard.F = true;
  });

  btnShot.addEventListener("touchend", () => {
    keyboard.F = false;
  });
});
