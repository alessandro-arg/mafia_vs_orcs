// Keydown handler for movement keys
function handleKeyDown(event) {
  if (!isGameReady) return;

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
}

// Keyup handler to reset movement keys
function handleKeyUp(event) {
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
}

// Initialize key listeners
function initializeKeyListeners() {
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp);
}

// Function to disable key listeners
function disableKeyListeners() {
  document.removeEventListener("keydown", handleKeyDown);
  document.removeEventListener("keyup", handleKeyUp);
}

/**
 * Initializes touch event listeners for on-screen buttons.
 * Ensures touch input updates the keyboard state.
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeKeyListeners();
  let btnLeft = document.getElementById("btnLeft");
  let btnRight = document.getElementById("btnRight");
  let btnJump = document.getElementById("btnJump");
  let btnShot = document.getElementById("btnShot");

  /**
   * Handles touch start event to activate the corresponding key.
   * @param {TouchEvent} event - The touch event.
   * @param {string} key - The key to activate.
   */
  function handleTouchStart(event, key) {
    event.preventDefault();
    keyboard[key] = true;
  }

  /**
   * Handles touch end event to deactivate the corresponding key.
   * @param {TouchEvent} event - The touch event.
   * @param {string} key - The key to deactivate.
   */
  function handleTouchEnd(event, key) {
    event.preventDefault();
    keyboard[key] = false;
  }

  /**
   * Handles touch cancel event to ensure key deactivation.
   * @param {TouchEvent} event - The touch event.
   * @param {string} key - The key to deactivate.
   */
  function handleTouchCancel(event, key) {
    event.preventDefault();
    keyboard[key] = false;
  }

  // Add touch event listeners to buttons
  btnLeft.addEventListener("touchstart", (e) => handleTouchStart(e, "LEFT"));
  btnLeft.addEventListener("touchend", (e) => handleTouchEnd(e, "LEFT"));
  btnLeft.addEventListener("touchcancel", (e) => handleTouchCancel(e, "LEFT"));

  btnRight.addEventListener("touchstart", (e) => handleTouchStart(e, "RIGHT"));
  btnRight.addEventListener("touchend", (e) => handleTouchEnd(e, "RIGHT"));
  btnRight.addEventListener("touchcancel", (e) =>
    handleTouchCancel(e, "RIGHT")
  );

  btnJump.addEventListener("touchstart", (e) => handleTouchStart(e, "SPACE"));
  btnJump.addEventListener("touchend", (e) => handleTouchEnd(e, "SPACE"));
  btnJump.addEventListener("touchcancel", (e) => handleTouchCancel(e, "SPACE"));

  btnShot.addEventListener("touchstart", (e) => handleTouchStart(e, "F"));
  btnShot.addEventListener("touchend", (e) => handleTouchEnd(e, "F"));
  btnShot.addEventListener("touchcancel", (e) => handleTouchCancel(e, "F"));
});
