const RADIUS = 8;
const SPEED  = 300; // px/s

const RAINBOW_HUES = [0, 51, 102, 154, 205, 256, 307];
const TRAIL_DURATION_MS = 50;
const TRAIL_MAX_COUNT   = 5;
const TRAIL_ALPHA_MAX   = 0.75;

export class Ball {
  constructor() {
    this.radius   = RADIUS;
    this.x        = 0;
    this.y        = 0;
    this.dx       = 0;
    this.dy       = 0;
    this.launched = false;
    this.color    = `hsl(${RAINBOW_HUES[Math.floor(Math.random() * RAINBOW_HUES.length)]}, 100%, 65%)`;
    this._trail      = [];
    this._hueIndex   = 0;
  }

  attachTo(paddle) {
    this.x = paddle.x + paddle.width / 2;
    this.y = paddle.y - this.radius;
  }

  launch(dirRight) {
    this.dx       = dirRight ? SPEED : -SPEED;
    this.dy       = -SPEED;
    this.launched = true;
  }

  update(delta, canvasWidth) {
    if (!this.launched) return;
    const dt = delta / 1000;
    this.x += this.dx * dt;
    this.y += this.dy * dt;

    if (this.x - this.radius < 0) {
      this.x  = this.radius;
      this.dx = Math.abs(this.dx);
    }
    if (this.x + this.radius > canvasWidth) {
      this.x  = canvasWidth - this.radius;
      this.dx = -Math.abs(this.dx);
    }
    if (this.y - this.radius < 0) {
      this.y  = this.radius;
      this.dy = Math.abs(this.dy);
    }

    this._trail.unshift({
      x:   this.x,
      y:   this.y,
      age: 0,
      hue: RAINBOW_HUES[this._hueIndex % RAINBOW_HUES.length],
    });
    this._hueIndex++;

    if (this._trail.length > TRAIL_MAX_COUNT) {
      this._trail.length = TRAIL_MAX_COUNT;
    }

    for (const p of this._trail) {
      p.age += delta;
    }
    this._trail = this._trail.filter(p => p.age < TRAIL_DURATION_MS);
  }

  clearTrail() {
    this._trail = [];
  }

  bounceOffPaddle(paddle) {
    if (this.dy <= 0) return;
    if (
      this.x + this.radius >= paddle.x &&
      this.x - this.radius <= paddle.x + paddle.width &&
      this.y + this.radius >= paddle.y &&
      this.y + this.radius <= paddle.y + paddle.height
    ) {
      this.y  = paddle.y - this.radius;
      this.dy = -Math.abs(this.dy);
    }
  }

  draw(ctx) {
    // draw trail oldest-first so newer ones render on top
    for (let i = this._trail.length - 1; i >= 0; i--) {
      const p     = this._trail[i];
      const alpha = TRAIL_ALPHA_MAX * (1 - p.age / TRAIL_DURATION_MS);
      ctx.beginPath();
      ctx.arc(p.x, p.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${alpha.toFixed(3)})`;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
