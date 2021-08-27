import DrawCircle from "./class/DrawCircle.js";

//init canvas
const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");

// width & height canvas
canvas.width = innerWidth / 2;
canvas.height = innerHeight / 2;

window.requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame;

const $ = (tag) => document.querySelector(tag);
let arrayBall;
const rayonBall = 30;
const startSpeed = $("#startSpeed");
const numberBall = $("#numberBall");
$('#restart').addEventListener('click', () => {
  window.location.reload(false);
})
$('#start').addEventListener('click', () => {
    arrayBall = creationCircle(
      numberBall.value,
      rayonBall,
      ["#6D378B", "#F2E501", "#F28E1E", "#2B72B2", "#8EBA25", "#C5037C"],
      startSpeed.value
    );
    animate();
})


/**
 * Create array of ball instance
 * @param {Number} nBall
 * @param {Number} rayon
 * @param {String} colors
 * @returns {Array<DrawCircle>}
 */
function creationCircle(nBall, rayon, colors, speedX) {
  const arrayInstanceOfBall = [];
  const vx = speedX;
  const vy = 0;
  // energy dissipation
  const coefRestit = 0.95;
  let startY;
  let startX;

  for (let i = 0; i < nBall; i++) {
    // random start ball in x & y
    startY = (Math.random() * (150)) + 10;
    startX = (Math.random() * (canvas.height - 50)) + 10;

    arrayInstanceOfBall.push(
      new DrawCircle(
        rayon,
        startY,
        startX,
        vx,
        vy,
        coefRestit,
        colors[Math.floor(Math.random() * colors.length)],
        1,
        1,
        canvas.height,
        canvas.width,
        ctx
      )
    );
  }

  return arrayInstanceOfBall;
}

/**
 * Animation ~ 50 fps
 *
 */
function animate() {
  // re-init canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arrayBall.forEach((element) => {
    element.draw();
    element.update();
  });
  requestAnimationFrame(animate);
}

