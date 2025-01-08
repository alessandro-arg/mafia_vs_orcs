let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  let howtoContainer = document.querySelector(".howto_container");
  let copyrightContainer = document.querySelector(".copyright_container");
  let instructions = document.querySelector(".instructions");

  howtoContainer.style.display = "none";
  copyrightContainer.style.display = "none";
  instructions.style.opacity = "0";

  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
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
