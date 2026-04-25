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

  draw(ctx) {
    for (const b of this.bricks) {
      if (!b.alive) continue;
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, b.y, b.width, b.height);
    }
  }
}
