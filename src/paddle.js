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
    const { x, y, width: w, height: h } = this;
    const r = h / 2; // corner radius = half height (fully rounded ends)

    // Rounded rect path
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();

    // White base
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Yellow center band
    const bandW = w * 0.3;
    const grad = ctx.createLinearGradient(x + (w - bandW) / 2, y, x + (w + bandW) / 2, y);
    grad.addColorStop(0,   'rgba(255,220,0,0)');
    grad.addColorStop(0.5, 'rgba(255,220,0,0.85)');
    grad.addColorStop(1,   'rgba(255,220,0,0)');
    ctx.fillStyle = grad;
    ctx.fill();
  }
}
