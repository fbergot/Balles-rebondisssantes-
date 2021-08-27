export default class DrawCircle {
  /**
   *Creates an instance of DrawCircle.
   * @param {Number} rayon
   * @param {Number} y
   * @param {Number} x
   * @param {Number} vx
   * @param {Number} vy
   * @param {Number} coefRestitution
   * @param {String} color
   * @memberof DrawCircle
   * @return {none}
   */
  constructor(rayon, y, x, vx, y, coefRestitution, color, deltaGrav, deltaTime, canvasHeight, canvasWidth, ctx) {
    this.rayon = rayon;
    this.y = y;
    this.x = x;
    this.vx = vx;
    this.vy = vy;
    this.coefRestitution = coefRestitution;
    this.color = color;
    this.deltaGrav = deltaGrav;
    this.deltaTime = deltaTime;
    this.PIx2 = 2 * Math.PI;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.ctx = ctx;
  }

  /**
   * Draw the circle
   * @memberof DrawCircle
   * @returns {none}
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.rayon, 0, this.PIx2, false);
    this.ctx.fill();
  }

  /**
   * Update speed
   *
   * @memberof DrawCircle
   * @returns {none}
   */
  update() {
    // dynamic of gravity
    this.vy += this.deltaGrav * this.deltaTime;
    this.x += this.vx * this.deltaTime;
    this.y += this.vy * this.deltaTime;
    // limit of canvas, speed inversion
    this.limitArea();
  }

  /**
   *
   * Area limit for ball on canvas bottom, left and right
   * @memberof DrawCircle
   * @returns {none}
   */
  limitArea() {
    // bottom
    if (this.y > this.canvasHeight - this.rayon) {
      this.y = this.canvasHeight - this.rayon;
      this.vy *= -this.coefRestitution;
    }
    // rigth
    if (this.x > this.canvasWidth - this.rayon) {
      this.x = this.canvasWidth - this.rayon;
      this.vx *= -this.coefRestitution;
    }
    // left
    if (this.x < this.rayon) {
      this.x = this.rayon;
      this.vx *= -this.coefRestitution;
    }
  }
}
