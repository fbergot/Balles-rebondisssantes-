import DrawCircle from "./class/DrawCircle.js";

//init canvas
const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");

// width & height canvas
canvas.width = innerWidth - 50;
canvas.height = innerHeight - 50;



/**
 * Create array of ball instance
 * @param {Number} nBall
 * @param {Number} rayon
 * @param {String} colors
 * @returns {Array<DrawCircle>}
 */
function creationCircle(nBall, rayon, colors) {
  const arrayInstanceOfBall = [];
  const vx = 10;
  const vy = 0;
  const coefRestit = 0.95;
  let startY;
  let startX;

  for (let i = 0; i < nBall; i++) {
    startY = (Math.random() * 250) + 10;
    startX = (Math.random() * 250) + 10;

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

const arrayBall = creationCircle(30, 15, ["#286593", "red", "yellow", "pink"]);

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

animate();
