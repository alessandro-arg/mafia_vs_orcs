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

/**
 * Checks the current screen orientation and updates the UI accordingly.
 */
function checkOrientation() {
  if (window.innerWidth < 920) {
    if (window.matchMedia("(orientation: portrait)").matches) {
      handlePortraitMode();
    } else {
      handleLandscapeMode();
    }
  } else {
    handleDesktopMode();
  }
}

/**
 * Handles UI updates when the device is in portrait mode.
 */
function handlePortraitMode() {
  toggleDisplay("flex", "none", "none", "none", "none", "none");
}

/**
 * Handles UI updates when the device is in landscape mode.
 */
function handleLandscapeMode() {
  toggleDisplay("none", "flex", "none", "", "", "");
}

/**
 * Handles UI updates when the screen width is large enough (desktop mode).
 */
function handleDesktopMode() {
  toggleDisplay("none", "flex", "none", "", "", "");
}

/**
 * Updates the display properties of various UI elements.
 *
 * @param {string} rotateScreen - Display style for the rotate screen overlay.
 * @param {string} start - Display style for the start screen.
 * @param {string} mobile - Display style for the mobile buttons.
 * @param {string} end - Display style for the end screen.
 * @param {string} win - Display style for the win screen.
 * @param {string} canvas - Display style for the game canvas.
 */
function toggleDisplay(rotateScreen, start, mobile, end, win, canvas) {
  document.getElementById("rotate_screen_overlay").style.display = rotateScreen;
  document.getElementById("start_screen").style.display = start;
  document.getElementById("mobile_buttons").style.display = mobile;
  document.getElementById("end_screen").style.display = end;
  document.getElementById("win_screen").style.display = win;
  document.getElementById("canvas").style.display = canvas;
}

/**
 * Initializes the game by setting up UI elements, enabling buttons, and starting the game logic.
 */
function init() {
  initializeStartScreen();
  let canvas = document.getElementById("canvas");
  let inGameButtons = document.querySelector(".in_game_buttons");
  canvas.style.transition = "opacity 1s ease-in-out";
  enableMobileButtons();
  setTimeout(function () {
    initializeElements();
    inGameButtons.classList.add("visible");
    setTimeout(function () {
      canvas.style.opacity = 1;
      initLevel();
      clearSounds();
      world = new World(canvas, keyboard);
      updateMuteButton();
      setTimeout(function () {
        enableInGameButtons();
      }, 1500);
    }, 800);
  }, 150);
}

/**
 * Handles the transition of the start screen by disabling the start button and fading out the screen.
 */
function initializeStartScreen() {
  let startScreen = document.getElementById("start_screen");
  let startButton = document.querySelector(".start_game_btn");
  startButton.disabled = true;
  startScreen.style.transition = "opacity 1s ease-in-out, visibility 0s 2s";
  startScreen.style.opacity = 0;
}

/**
 * Initializes various UI elements such as the start, end, and win screens, setting their visibility and transitions.
 */
function initializeElements() {
  let startScreen = document.getElementById("start_screen");
  let endScreen = document.getElementById("end_screen");
  let winScreen = document.getElementById("win_screen");
  let instructions = document.querySelector(".instructions");
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
}

/**
 * Restarts the game by resetting UI elements, clearing game data, and reinitializing the game world.
 */
function restartGame() {
  disableInGameButtons();
  clearAllIntervals();
  muteAllSounds();
  resetUIElements();
  clearCanvas();
  stopGameWorld();
  setTimeout(startNewGame, 400);
}

/**
 * Resets the visibility and opacity of key UI elements (start, end, and win screens).
 */
function resetUIElements() {
  let startScreen = document.getElementById("start_screen");
  let endScreen = document.getElementById("end_screen");
  let winScreen = document.getElementById("win_screen");
  startScreen.style.visibility = "hidden";
  startScreen.style.opacity = 0;
  endScreen.style.visibility = "hidden";
  endScreen.style.opacity = 0;
  endScreen.style.display = "none";
  winScreen.style.visibility = "hidden";
  winScreen.style.opacity = 0;
  winScreen.style.display = "none";
}

/**
 * Clears the game canvas by removing all drawn elements.
 */
function clearCanvas() {
  let canvasElement = document.getElementById("canvas");
  canvasElement.style.transition = "opacity 2s ease-in-out";
  canvasElement.style.opacity = 0;
  const context = canvasElement.getContext("2d");
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

/**
 * Stops the current game world instance if it exists.
 */
function stopGameWorld() {
  if (window.world) {
    world.stopGame();
    world = null;
  }
}

/**
 * Starts a new game after a short delay, restoring UI elements and game logic.
 */
function startNewGame() {
  init();
  updateMuteButton();
  setTimeout(function () {
    let canvasElement = document.getElementById("canvas");
    canvasElement.style.opacity = 1;
    world.game_sound.play();
    world.game_sound.loop = true;
    enableInGameButtons();
  }, 2000);
}

/**
 * Returns to the main menu by resetting UI elements and clearing game state.
 */
function returnMenu() {
  exitFullscreenMode();
  disableGameControls();
  clearAllIntervals();
  muteAllSounds();
  resetUIForMenu();
  clearGameState();
}

/**
 * Exits fullscreen mode if the game is in fullscreen.
 */
function exitFullscreenMode() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}

/**
 * Disables in-game and mobile buttons.
 */
function disableGameControls() {
  disableInGameButtons();
  disableMobileButtons();
}

/**
 * Resets UI elements for returning to the menu.
 */
function resetUIForMenu() {
  let startScreen = document.getElementById("start_screen");
  let endScreen = document.getElementById("end_screen");
  let winScreen = document.getElementById("win_screen");
  let canvasElement = document.getElementById("canvas");
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
}

/**
 * Clears game state, including sounds and world instance.
 */
function clearGameState() {
  let canvasElement = document.getElementById("canvas");
  const context = canvasElement.getContext("2d");
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
  stopGameWorld();
  sounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;
  });
  muted = true;
}

/**
 * Toggles the mute state of all sounds and updates the mute button icon accordingly.
 * The mute state is stored in a global variable 'muted'.
 */
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

/**
 * Resets the mute state to unmuted and updates the mute button icon.
 */
function updateMuteButton() {
  muted = false;
  const muteButton = document.getElementById("mute_button");
  if (!muted) {
    muteButton.src = "img/in_game_buttons/loud.png";
  }
}

/**
 * Pauses all sounds, resets their playback position to the start, and disables looping.
 * Clears the 'sounds' array.
 */
function clearSounds() {
  sounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;
  });
  sounds = [];
}

/**
 * Pauses all sounds, resets their playback position to the start, and disables looping.
 * Mutes all sounds and sets the 'muted' state to true.
 */
function muteAllSounds() {
  sounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
    sound.loop = false;
    sound.muted = true;
  });
  muted = true;
}

/**
 * Toggles the fullscreen mode of the document.
 * Requests fullscreen if not already in fullscreen mode, otherwise exits fullscreen.
 */
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

/**
 * Clears all active intervals by calling 'clearInterval' on each one stored in the 'activeIntervals' array.
 * Resets the 'activeIntervals' array to an empty state.
 */
function clearAllIntervals() {
  activeIntervals.forEach(clearInterval);
  activeIntervals = [];
}

/**
 * Disables all in-game buttons by setting their 'disabled' property to true.
 */
function disableInGameButtons() {
  const div = document.querySelector(".in_game_buttons");
  const buttons = div.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
  });
}

/**
 * Enables all in-game buttons by setting their 'disabled' property to false.
 */
function enableInGameButtons() {
  const div = document.querySelector(".in_game_buttons");
  const buttons = div.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = false;
  });
}

/**
 * Toggles the visibility of the instructions based on the screen width.
 * Shows the desktop instructions if the screen is wider than 920px, otherwise shows the mobile instructions.
 */
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

/**
 * Toggles the visibility of the how-to container.
 * Adds or removes an event listener to close the container if clicked outside.
 */
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

/**
 * Toggles the visibility of the copyright container.
 * Adds or removes an event listener to close the container if clicked outside.
 */
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

/**
 * Closes the how-to or copyright container if a click is detected outside of the container.
 * Removes the event listener once the container is closed.
 *
 * @param {Event} event - The click event that triggers the closure.
 */
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

/**
 * Displays the mobile buttons if the screen width is below 920px.
 */
function enableMobileButtons() {
  let div = document.getElementById("mobile_buttons");

  if (window.innerWidth < 920) {
    div.style.display = "flex";
  }
}

/**
 * Hides the mobile buttons if the screen width is above 920px.
 */
function disableMobileButtons() {
  let div = document.getElementById("mobile_buttons");
  div.style.display = "none";
}
