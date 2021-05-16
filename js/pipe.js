class Pipe{
  constructor() {
    this.x = width*1.2;
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
    blendMode(BLEND);
    stroke(255,0,244);
    strokeWeight(2);
    fill(0);
    rect(this.x, 0, pipeWidth, this.pipeTop - width / 20);
    rect(this.x, this.pipeBottom + width / 20, pipeWidth, height - this.pipeBottom - width / 20);

    
    
    stroke(255,0,244);
    fill(0);
    // blendMode(DIFFERENCE);
    rect(this.x + width/60, 0, pipeWidth - width/30 - 1, this.pipeTop - width / 20);
    rect(this.x + width / 60, this.pipeBottom + width / 20, pipeWidth - width / 30 - 1, height - this.pipeBottom - width / 20);
    fill(0);
    stroke(0,236,255);
    rect(this.x - width / 100, this.pipeBottom, pipeWidth + width / 50, width / 20);
    rect(this.x - width / 100, this.pipeTop - width / 20, pipeWidth + width / 50, width / 20);
  }
}