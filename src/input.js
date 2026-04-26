export class Input {
  constructor(canvas) {
    this.keys             = {};
    this.pressedThisFrame = new Set();
    this.lastDirection    = 'left';
    this.pointerX         = null;
    this._tappedThisFrame = false;

    window.addEventListener('keydown', e => {
      if (!this.keys[e.key]) this.pressedThisFrame.add(e.key);
      this.keys[e.key] = true;
      if (e.key === 'ArrowRight') this.lastDirection = 'right';
      if (e.key === 'ArrowLeft')  this.lastDirection = 'left';
    });
    window.addEventListener('keyup', e => { this.keys[e.key] = false; });

    if (canvas) {
      canvas.addEventListener('pointermove', e => {
        const rect = canvas.getBoundingClientRect();
        this.pointerX = (e.clientX - rect.left) * (canvas.width / rect.width);
      });
      canvas.addEventListener('pointerdown', e => {
        const rect = canvas.getBoundingClientRect();
        this.pointerX = (e.clientX - rect.left) * (canvas.width / rect.width);
        this.lastDirection = this.pointerX > canvas.width / 2 ? 'right' : 'left';
        this._tappedThisFrame = true;
      });
      canvas.addEventListener('pointerleave', () => {
        this.pointerX = null;
      });
    }
  }

  isDown(key) {
    return !!this.keys[key];
  }

  justPressed(key) {
    if (key === ' ' && this._tappedThisFrame) return true;
    return this.pressedThisFrame.has(key);
  }

  clearFrame() {
    this.pressedThisFrame.clear();
    this._tappedThisFrame = false;
  }
}
