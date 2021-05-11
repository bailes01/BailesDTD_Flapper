class Pipe{
  constructor() {
    this.x = width;
    this.pipeTop = random(pipeMargin, (height - pipeMargin) - pipeGap);
    this.pipeBottom = this.pipeTop + pipeGap;
  }
  update() {
    this.x -= pipeSpeed;
  }
  render() {
    fill(50, 10, 200);
    rect(this.x, 0, pipeWidth, this.pipeTop);
    rect(this.x, this.pipeBottom, pipeWidth, height - this.pipeBottom);
  }
}