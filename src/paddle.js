const WIDTH  = 80;
const HEIGHT = 10;
const SPEED  = 300; // px/s

export class Paddle {
  constructor(canvasWidth, canvasHeight) {
    this.width  = WIDTH;
    this.height = HEIGHT;
    this.x = (canvasWidth - WIDTH) / 2;
    this.y = canvasHeight - 30;
    this.canvasWidth = canvasWidth;
  }

  update(delta, input) {
    const dx = SPEED * (delta / 1000);
    if (input.isDown('ArrowLeft'))  this.x = Math.max(0, this.x - dx);
    if (input.isDown('ArrowRight')) this.x = Math.min(this.canvasWidth - this.width, this.x + dx);
  }

  draw(ctx) {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
