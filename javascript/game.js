let canvas;
let world;
let keyboard = new Keyboard();
let activeIntervals = [];

function init() {
  let startScreen = document.getElementById("start_screen");
  let endScreen = document.getElementById("end_screen");
  canvas = document.getElementById("canvas");
  let instructions = document.querySelector(".instructions");

  instructions.style.opacity = 0;
  startScreen.classList.add("darken");
  canvas.style.opacity = 0;

  setTimeout(function () {
    startScreen.style.opacity = 0;
    startScreen.style.visibility = "hidden";
    endScreen.style.opacity = 0;
    endScreen.style.visibility = "hidden";

    setTimeout(function () {
      canvas.style.opacity = 1;
      initLevel();
      world = new World(canvas, keyboard);
      updateInGameButtonsVisibility();
    }, 1000);
  }, 50);
}

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.querySelector(".start_game_btn");
  startButton.addEventListener("click", init);
});

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

function restartGame() {
  clearAllIntervals();
  const startScreen = document.getElementById("start_screen");
  const endScreen = document.getElementById("end_screen");
  const canvasElement = document.getElementById("canvas");
  startScreen.style.visibility = "hidden";
  startScreen.style.opacity = 0;
  startScreen.classList.remove("darken");
  endScreen.style.visibility = "hidden";
  endScreen.style.opacity = 0;
  canvasElement.style.transition = "none";
  canvasElement.style.visibility = "hidden";
  canvasElement.style.opacity = 0;
  const context = canvasElement.getContext("2d");
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);

  setTimeout(function () {
    initLevel();
    init();
    canvasElement.style.transition = "opacity 2s ease-in-out";

    setTimeout(function () {
      canvasElement.style.visibility = "visible";
      canvasElement.style.opacity = 1;
      updateInGameButtonsVisibility();
    }, 1500);
  }, 50);
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

function returnMenu() {
  clearAllIntervals();
  const startScreen = document.getElementById("start_screen");
  const endScreen = document.getElementById("end_screen");
  const canvasElement = document.getElementById("canvas");
  startScreen.style.visibility = "visible";
  startScreen.style.opacity = 1;
  endScreen.style.visibility = "hidden";
  endScreen.style.opacity = 0;
  canvasElement.style.opacity = 0;

  setTimeout(function () {
    updateInGameButtonsVisibility();
  }, 300);
}

function updateInGameButtonsVisibility() {
  const startScreen = document.getElementById("start_screen");
  const endScreen = document.getElementById("end_screen");
  const inGameButtons = document.querySelector(".in_game_buttons");

  if (
    startScreen.style.visibility === "hidden" &&
    endScreen.style.visibility === "hidden"
  ) {
    inGameButtons.classList.add("visible");
  } else {
    inGameButtons.classList.remove("visible");
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
