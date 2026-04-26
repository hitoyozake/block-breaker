const COLS       = 10;
const ROWS       = 5;
const BRICK_W    = 44;
const BRICK_H    = 20;
const GAP        = 4;
const OFFSET_TOP = 50;
const OFFSET_LEFT = (480 - (COLS * (BRICK_W + GAP) - GAP)) / 2; // = 2px

const ROW_COLORS  = ['#FF4444', '#FF8800', '#FFFF00', '#44FF44', '#4488FF'];
const ROW_POINTS  = [50, 40, 30, 20, 10];

const _blockImg = new Image();
_blockImg.src = 'assets/block.png';

export class Bricks {
  constructor() {
    this._colorCache = {};
    this.bricks = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        this.bricks.push({
          x:      OFFSET_LEFT + c * (BRICK_W + GAP),
          y:      OFFSET_TOP  + r * (BRICK_H + GAP),
          width:  BRICK_W,
          height: BRICK_H,
          color:  ROW_COLORS[r],
          points: ROW_POINTS[r],
          alive:  true,
        });
      }
    }
  }

  // Returns points earned, or 0 if no hit
  checkCollision(ball) {
    for (const b of this.bricks) {
      if (!b.alive) continue;
      const overlapX = Math.min(ball.x + ball.radius, b.x + b.width)  - Math.max(ball.x - ball.radius, b.x);
      const overlapY = Math.min(ball.y + ball.radius, b.y + b.height) - Math.max(ball.y - ball.radius, b.y);
      if (overlapX > 0 && overlapY > 0) {
        b.alive = false;
        if (overlapX < overlapY) {
          ball.dx = -ball.dx;
        } else {
          ball.dy = -ball.dy;
        }
        return b.points;
      }
    }
    return 0;
  }

  allCleared() {
    return this.bricks.every(b => !b.alive);
  }

  _getColoredBrick(color) {
    if (!_blockImg.complete || !_blockImg.naturalWidth) return null;
    if (this._colorCache[color]) return this._colorCache[color];
    const off = document.createElement('canvas');
    off.width  = BRICK_W;
    off.height = BRICK_H;
    const oc = off.getContext('2d');
    oc.fillStyle = '#FFFFFF';
    oc.fillRect(0, 0, BRICK_W, BRICK_H);
    oc.drawImage(_blockImg, 0, 0, BRICK_W, BRICK_H);
    oc.globalCompositeOperation = 'multiply';
    oc.fillStyle = color;
    oc.fillRect(0, 0, BRICK_W, BRICK_H);
    this._colorCache[color] = off;
    return off;
  }

  draw(ctx) {
    for (const b of this.bricks) {
      if (!b.alive) continue;
      const colored = this._getColoredBrick(b.color);
      if (colored) {
        ctx.drawImage(colored, b.x, b.y);
      } else {
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.width, b.height);
      }
    }
  }
}
