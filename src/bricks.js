const COLS       = 10;
const ROWS       = 5;
const BRICK_W    = 44;
const BRICK_H    = 20;
const GAP        = 4;
const OFFSET_TOP = 50;
const OFFSET_LEFT = (480 - (COLS * (BRICK_W + GAP) - GAP)) / 2; // = 2px

const ROW_COLORS = ['#FF4444', '#FF8800', '#FFFF00', '#44FF44', '#4488FF'];

export class Bricks {
  constructor() {
    this.bricks = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        this.bricks.push({
          x:      OFFSET_LEFT + c * (BRICK_W + GAP),
          y:      OFFSET_TOP  + r * (BRICK_H + GAP),
          width:  BRICK_W,
          height: BRICK_H,
          color:  ROW_COLORS[r],
          alive:  true,
        });
      }
    }
  }

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
        return true;
      }
    }
    return false;
  }

  allCleared() {
    return this.bricks.every(b => !b.alive);
  }

  draw(ctx) {
    for (const b of this.bricks) {
      if (!b.alive) continue;
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.width, b.height);
    }
  }
}
