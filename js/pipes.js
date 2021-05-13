class Pipes {
  constructor() {
    this.pipeArray = [new Pipe()];
    
  }

  getClosestPipe() {
    let closestPipe = null;
    let closestD = Infinity;
    this.pipeArray.forEach(p => {
    
      let d = (p.x + pipeWidth) - birdX;
      if (d < closestD && d > 0) {
        closestPipe = p;
        closestD = d;
      }
    });
    if (closestPipe == null) {
      closestPipe = this.pipeArray[0];
    }
    return closestPipe;
  }

  update() {
    if (gameCount % newPipeRate == 0) {
      this.pipeArray.push(new Pipe());
    }
    if (this.pipeArray[0].x + pipeWidth < 0) {
      this.pipeArray.shift();
    }
    this.pipeArray.forEach(pipe => {
      pipe.update();
    });
    
  }
  render() {
    this.pipeArray.forEach(pipe => {
      pipe.render();
    }); 
  }
}