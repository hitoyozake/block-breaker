import { Paddle } from './paddle.js';
import { Input }  from './input.js';
import { Bricks } from './bricks.js';
import { Ball }   from './ball.js';

const STATE = { PLAY: 'play', GAMEOVER: 'gameover', CLEAR: 'clear' };

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.lastTime = 0;
    this.input  = new Input();
    this.state  = STATE.PLAY;
    this._init();
  }

  _init() {
    this.paddle = new Paddle(this.canvas.width, this.canvas.height);
    this.bricks = new Bricks();
    this.ball   = new Ball();
    this.state  = STATE.PLAY;
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
    if (this.state !== STATE.PLAY) {
      if (this.input.justPressed(' ')) this._init();
      this.input.clearFrame();
      return;
    }

    this.paddle.update(delta, this.input);

    if (!this.ball.launched) {
      this.ball.attachTo(this.paddle);
      if (this.input.justPressed(' ')) {
        this.ball.launch(this.input.lastDirection === 'right');
      }
    }

    this.ball.update(delta, this.canvas.width);
    this.ball.bounceOffPaddle(this.paddle);
    this.bricks.checkCollision(this.ball);

    if (this.ball.y - this.ball.radius > this.canvas.height) {
      this.state = STATE.GAMEOVER;
    } else if (this.bricks.allCleared()) {
      this.state = STATE.CLEAR;
    }

    this.input.clearFrame();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bricks.draw(this.ctx);
    this.paddle.draw(this.ctx);
    this.ball.draw(this.ctx);

    if (this.state === STATE.GAMEOVER) {
      this._drawOverlay('GAME OVER', '#FF4444');
    } else if (this.state === STATE.CLEAR) {
      this._drawOverlay('CLEAR!', '#44FF44');
    }
  }

  _drawOverlay(text, color) {
    const { width, height } = this.canvas;
    this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.fillStyle = color;
    this.ctx.font = 'bold 48px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(text, width / 2, height / 2 - 20);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '20px monospace';
    this.ctx.fillText('SPACE to restart', width / 2, height / 2 + 30);
  }
}
