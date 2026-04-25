const RADIUS = 8;
const SPEED  = 300; // px/s

export class Ball {
  constructor() {
    this.radius   = RADIUS;
    this.x        = 0;
    this.y        = 0;
    this.dx       = 0;
    this.dy       = 0;
    this.launched = false;
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
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
  }
}
