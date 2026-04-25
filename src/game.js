import { Paddle } from './paddle.js';
import { Input }  from './input.js';
import { Bricks } from './bricks.js';
import { Ball }   from './ball.js';

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.lastTime = 0;
    this.input  = new Input();
    this.paddle = new Paddle(canvas.width, canvas.height);
    this.bricks = new Bricks();
    this.ball   = new Ball();
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    const delta = time - this.lastTime;
    this.lastTime = time;
    this.update(delta);
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  update(delta) {
    this.paddle.update(delta, this.input);
    if (!this.ball.launched) {
      this.ball.attachTo(this.paddle);
      if (this.input.justPressed(' ')) {
        this.ball.launch(this.input.lastDirection === 'right');
      }
    }
    this.ball.update(delta, this.canvas.width);
    this.input.clearFrame();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.draw(this.ctx);
    this.paddle.draw(this.ctx);
    this.ball.draw(this.ctx);
  }
}
