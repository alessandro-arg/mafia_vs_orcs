let canvas;
let world;
let keyboard = new Keyboard();
let activeIntervals = [];

function init() {
  let startScreen = document.getElementById("start_screen");
  let startButton = document.querySelector(".start_game_btn");
  let endScreen = document.getElementById("end_screen");
  let canvas = document.getElementById("canvas");
  let inGameButtons = document.querySelector(".in_game_buttons");
  let instructions = document.querySelector(".instructions");

  startButton.disabled = true;
  startScreen.style.transition = "opacity 1s ease-in-out, visibility 0s 2s";
  startScreen.style.opacity = 0;
  canvas.style.transition = "opacity 1s ease-in-out";

  setTimeout(function () {
    startScreen.style.visibility = "hidden";
    endScreen.style.transition = "opacity 1.5s ease-in-out";
    endScreen.style.opacity = 0;
    endScreen.style.visibility = "hidden";
    instructions.style.opacity = 0;

    setTimeout(function () {
      canvas.style.opacity = 1;
      initLevel();
      world = new World(canvas, keyboard);
      inGameButtons.classList.add("visible");

      setTimeout(function () {
        enableInGameButtons();
      }, 1500);
    }, 800);
  }, 150);
}

function restartGame() {
  disableInGameButtons();
  clearAllIntervals();
  let startScreen = document.getElementById("start_screen");
  let endScreen = document.getElementById("end_screen");
  let canvasElement = document.getElementById("canvas");

  startScreen.style.visibility = "hidden";
  startScreen.style.opacity = 0;
  endScreen.style.visibility = "hidden";
  endScreen.style.opacity = 0;
  canvasElement.style.transition = "opacity 2s ease-in-out";
  canvasElement.style.opacity = 0;

  const context = canvasElement.getContext("2d");
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  initLevel();

  setTimeout(function () {
    init();

    setTimeout(function () {
      canvasElement.style.opacity = 1;
    }, 2000);
  }, 400);
}

function returnMenu() {
  exitFullscreen();
  disableInGameButtons();
  clearAllIntervals();
  let startScreen = document.getElementById("start_screen");
  let endScreen = document.getElementById("end_screen");
  let canvasElement = document.getElementById("canvas");
  let inGameButtons = document.querySelector(".in_game_buttons");
  let startButton = document.querySelector(".start_game_btn");

  startButton.disabled = false;
  startScreen.style.visibility = "visible";
  startScreen.style.opacity = 1;
  startScreen.style.transition = "opacity 1.5s ease-in-out";
  endScreen.style.visibility = "hidden";
  endScreen.style.opacity = 0;
  canvasElement.style.opacity = 0;
  inGameButtons.classList.remove("visible");

  const context = canvasElement.getContext("2d");
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (window.world) {
    world.stopGame();
  }

  window.world = null;
}

function enterFullscreen() {
  let canvas = document.querySelector("canvas");
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

function setIntervalAndTrack(callback, delay) {
  const interval = setInterval(callback, delay);
  activeIntervals.push(interval);
  return interval;
}

function clearAllIntervals() {
  activeIntervals.forEach(clearInterval);
  activeIntervals = [];
}

function disableInGameButtons() {
  const div = document.querySelector(".in_game_buttons");
  const buttons = div.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
  });
}

function enableInGameButtons() {
  const div = document.querySelector(".in_game_buttons");
  const buttons = div.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = false;
  });
}

function showInstructions() {
  let instructions = document.querySelector(".instructions");
  if (instructions.style.opacity == 0) {
    instructions.style.opacity = 1;
  } else if ((instructions.style.opacity = 1)) {
    instructions.style.opacity = 0;
  }
}

function showHowTo() {
  let howtoContainer = document.querySelector(".howto_container");

  if (
    howtoContainer.style.display === "none" ||
    howtoContainer.style.display === ""
  ) {
    howtoContainer.style.display = "flex";
    howtoContainer.addEventListener("click", closeIfClickOutside);
  } else {
    howtoContainer.style.display = "none";
    howtoContainer.removeEventListener("click", closeIfClickOutside);
  }
}

function showCopyright() {
  let copyrightContainer = document.querySelector(".copyright_container");

  if (
    copyrightContainer.style.display === "none" ||
    copyrightContainer.style.display === ""
  ) {
    copyrightContainer.style.display = "flex";
    copyrightContainer.addEventListener("click", closeIfClickOutside);
  } else {
    copyrightContainer.style.display = "none";
    copyrightContainer.removeEventListener("click", closeIfClickOutside);
  }
}

function closeIfClickOutside(event) {
  let howtoContainer = document.querySelector(".howto_container");
  let howtoContent = document.querySelector(".howto_content");
  let copyrightContainer = document.querySelector(".copyright_container");
  let copyrightContent = document.querySelector(".copyright_content");

  if (
    howtoContainer.style.display === "flex" &&
    !howtoContent.contains(event.target)
  ) {
    howtoContainer.style.display = "none";
    document.removeEventListener("click", closeIfClickOutside);
  } else if (
    copyrightContainer.style.display === "flex" &&
    !copyrightContent.contains(event.target)
  ) {
    copyrightContainer.style.display = "none";
    document.removeEventListener("click", closeIfClickOutside);
  }
}

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
