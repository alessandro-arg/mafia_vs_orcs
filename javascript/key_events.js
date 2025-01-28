let btnLeft = document.getElementById("btnLeft");

document.addEventListener("keydown", (event) => {
  if (event.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (event.keyCode == 38) {
    keyboard.UP = true;
  }

  if (event.keyCode == 40) {
    keyboard.DOWN = true;
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

  if (event.keyCode == 40) {
    keyboard.DOWN = false;
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

document.addEventListener("touchstart", (event) => {
  if (event.btnLeft) {
    keyboard.LEFT = true;
  }
});

document.addEventListener("touchend", (event) => {
  if (event.btnLeft) {
    keyboard.LEFT = false;
  }
});

// document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
//   e.preventDefault();
//   keyboard.LEFT = true;
// });

// document.getElementById("btnLeft").addEventListener("touchend", (e) => {
//   e.preventDefault();
//   keyboard.LEFT = false;
// });
