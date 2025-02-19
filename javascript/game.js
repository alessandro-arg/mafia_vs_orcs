let canvas;
let world;
let keyboard = new Keyboard();
let activeIntervals = [];
let sounds = [];
let muted = false;

document.addEventListener("DOMContentLoaded", () => {
  checkOrientation();
  window.addEventListener("resize", checkOrientation);
  let howtoContainer = document.querySelector(".howto_container");
  howtoContainer.addEventListener("click", closeIfClickOutside);

  if (localStorage.getItem("alreadyPlayed")) {
    howtoContainer.style.display = "none";
  } else {
    howtoContainer.style.display = "flex";
    localStorage.setItem("alreadyPlayed", "true");
  }
});

function checkOrientation() {
  let rotateScreenOverlay = document.getElementById("rotate_screen_overlay");
  let startScreen = document.getElementById("start_screen");
  let mobileBtns = document.getElementById("mobile_buttons");
  let endScreen = document.getElementById("end_screen");
  let winScreen = document.getElementById("win_screen");
  let canvas = document.getElementById("canvas");

  if (window.innerWidth < 920) {
    if (window.matchMedia("(orientation: portrait)").matches) {
      rotateScreenOverlay.style.display = "flex";
      startScreen.style.display = "none";
      mobileBtns.style.display = "none";
      endScreen.style.display = "none";
      winScreen.style.display = "none";
      canvas.style.display = "none";
    } else {
      rotateScreenOverlay.style.display = "none";
      startScreen.style.display = "flex";
      endScreen.style.display = "";
      winScreen.style.display = "";
      canvas.style.display = "";
    }
  } else {
    rotateScreenOverlay.style.display = "none";
    startScreen.style.display = "flex";
    mobileBtns.style.display = "none";
    endScreen.style.display = "";
    winScreen.style.display = "";
    canvas.style.display = "";
  }
}

function init() {
  let startScreen = document.getElementById("start_screen");
  let startButton = document.querySelector(".start_game_btn");
  let endScreen = document.getElementById("end_screen");
  let winScreen = document.getElementById("win_screen");
  let canvas = document.getElementById("canvas");
  let inGameButtons = document.querySelector(".in_game_buttons");
  let instructions = document.querySelector(".instructions");
  startButton.disabled = true;
  startScreen.style.transition = "opacity 1s ease-in-out, visibility 0s 2s";
  startScreen.style.opacity = 0;
  canvas.style.transition = "opacity 1s ease-in-out";
  enableMobileButtons();
  setTimeout(function () {
    startScreen.style.visibility = "hidden";
    endScreen.style.display = "flex";
    endScreen.style.transition = "opacity 1.5s ease-in-out";
    endScreen.style.opacity = 0;
    endScreen.style.visibility = "hidden";
    winScreen.style.display = "flex";
    winScreen.style.transition = "opacity 1.5s ease-in-out";
    winScreen.style.opacity = 0;
    winScreen.style.visibility = "hidden";
    instructions.style.opacity = 0;

    setTimeout(function () {
      canvas.style.opacity = 1;
      initLevel();
      clearSounds();
      world = new World(canvas, keyboard);
      inGameButtons.classList.add("visible");
      updateMuteButton();
      setTimeout(function () {
        enableInGameButtons();
      }, 1500);
    }, 800);
  }, 150);
}

function restartGame() {
  disableInGameButtons();
  clearAllIntervals();
  muteAllSounds();
  let startScreen = document.getElementById("start_screen");
  let endScreen = document.getElementById("end_screen");
  let winScreen = document.getElementById("win_screen");
  let canvasElement = document.getElementById("canvas");
  startScreen.style.visibility = "hidden";
  startScreen.style.opacity = 0;
  endScreen.style.visibility = "hidden";
  endScreen.style.opacity = 0;
  endScreen.style.display = "none";
  winScreen.style.visibility = "hidden";
  winScreen.style.opacity = 0;
  winScreen.style.display = "none";
  canvasElement.style.transition = "opacity 2s ease-in-out";
  canvasElement.style.opacity = 0;
  const context = canvasElement.getContext("2d");
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (window.world) {
    world.stopGame();
    world = null;
  }

  setTimeout(function () {
    init();
    updateMuteButton();
    setTimeout(function () {
      canvasElement.style.opacity = 1;
      world.game_sound.play();
      world.game_sound.loop = true;
    }, 2000);
  }, 400);
}

function returnMenu() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  disableInGameButtons();
  disableMobileButtons();
  clearAllIntervals();
  muteAllSounds();
  let startScreen = document.getElementById("start_screen");
  let endScreen = document.getElementById("end_screen");
  let winScreen = document.getElementById("win_screen");
  let canvasElement = document.getElementById("canvas");
  let inGameButtons = document.querySelector(".in_game_buttons");
  let startButton = document.querySelector(".start_game_btn");
  startButton.disabled = false;
  startScreen.style.visibility = "visible";
  startScreen.style.opacity = 1;
  startScreen.style.transition = "opacity 1.5s ease-in-out";
  winScreen.style.visibility = "hidden";
  winScreen.style.opacity = 0;
  winScreen.style.display = "none";
  endScreen.style.visibility = "hidden";
  endScreen.style.opacity = 0;
  endScreen.style.display = "none";
  canvasElement.style.opacity = 0;
  inGameButtons.classList.remove("visible");
  const context = canvasElement.getContext("2d");
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);

  if (window.world) {
    world.stopGame();
    world = null;
  }

  sounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;
  });

  muted = true;
}

function mute() {
  sounds.forEach((sound) => {
    sound.muted = !sound.muted;
    muted = sound.muted;
  });
  const muteButton = document.getElementById("mute_button");

  if (muted) {
    muteButton.src = "img/in_game_buttons/mute.png";
  } else {
    muteButton.src = "img/in_game_buttons/loud.png";
  }
}

function updateMuteButton() {
  muted = false;
  const muteButton = document.getElementById("mute_button");
  if (!muted) {
    muteButton.src = "img/in_game_buttons/loud.png";
  }
}

function clearSounds() {
  sounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;
  });
  sounds = [];
}

function muteAllSounds() {
  sounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;
    sound.muted = true;
  });
  muted = true;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    let screen = document.documentElement;
    if (screen.requestFullscreen) {
      screen.requestFullscreen();
    } else if (screen.msRequestFullscreen) {
      screen.msRequestFullscreen();
    } else if (document.webkitRequestFullscreen) {
      screen.webkitRequestFullscreen();
    }
  } else {
    document.exitFullscreen();
  }
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
  let screenWidth = window.innerWidth;
  let instructions = document.querySelector(".instructions");
  let mobileInstructions = document.querySelector(".mobile_instructions");

  if (screenWidth > 920) {
    instructions.style.opacity = instructions.style.opacity == 0 ? 1 : 0;
  } else {
    mobileInstructions.style.display =
      mobileInstructions.style.display === "flex" ? "none" : "flex";
  }
}

function showHowTo() {
  let howtoContainer = document.querySelector(".howto_container");

  if (howtoContainer.style.display === "flex") {
    howtoContainer.style.display = "none";
    howtoContainer.removeEventListener("click", closeIfClickOutside);
  } else {
    howtoContainer.style.display = "flex";
    howtoContainer.addEventListener("click", closeIfClickOutside);
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

function enableMobileButtons() {
  let div = document.getElementById("mobile_buttons");

  if (window.innerWidth < 920) {
    div.style.display = "flex";
  }
}

function disableMobileButtons() {
  let div = document.getElementById("mobile_buttons");
  div.style.display = "none";
}
