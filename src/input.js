export class Input {
  constructor() {
    this.keys             = {};
    this.pressedThisFrame = new Set();
    this.lastDirection    = 'left';
    window.addEventListener('keydown', e => {
      if (!this.keys[e.key]) this.pressedThisFrame.add(e.key);
      this.keys[e.key] = true;
      if (e.key === 'ArrowRight') this.lastDirection = 'right';
      if (e.key === 'ArrowLeft')  this.lastDirection = 'left';
    });
    window.addEventListener('keyup', e => { this.keys[e.key] = false; });
  }

  isDown(key) {
    return !!this.keys[key];
  }

  justPressed(key) {
    return this.pressedThisFrame.has(key);
  }

  clearFrame() {
    this.pressedThisFrame.clear();
  }
}
