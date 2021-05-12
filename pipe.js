class Pipe{
  constructor() {
    this.x = width;
    this.scored = false
    this.pipeTop = random(pipeMargin, (height - pipeMargin) - pipeGap);
    this.pipeBottom = this.pipeTop + pipeGap;
  }
  update() {
    this.x -= pipeSpeed;
    if (this.x + pipeWidth < birdX - birdRad && this.scored == false) {
      totalScore += 1;
      this.scored = true;
    }
    
    // if (this.x + pipeWidth < width / 4 && this.scored == false) {
    //   this.scored = true;
    //   return 1;
    // }
    // return 0;
  }
  render() {
    fill(50, 10, 200);
    rect(this.x, 0, pipeWidth, this.pipeTop);
    rect(this.x, this.pipeBottom, pipeWidth, height - this.pipeBottom);
  }
}