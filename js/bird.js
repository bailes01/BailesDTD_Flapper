class Bird{
  constructor(brain) {
    this.y = height / 2;
    this.vel = 0;
    this.acc = 0;
    this.dead = false;
    this.score = 0;
    this.fitness = 0;
    this.framesSurvived = 0;
    this.color = color(255, 0, 255);
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(NNI, NNH, NNO);  
    }
  }

  applyForce(force) {
    this.acc += force;
  }

  update() {
    this.applyForce(gravity);
    this.vel += this.acc;
    this.vel *= 0.95;
    this.y += this.vel;
    this.acc = 0;
    this.framesSurvived += 1;
  }

  render() {
    fill(255, 255, 255, 200);
    ellipse(birdX, this.y, birdRad * 2, birdRad * 2);
  }

  think(pipe) {
    var inputs = [this.vel / 19,
                  this.y / height,
                  pipe.x / width,
                  pipe.pipeBottom / height,
                  pipe.pipeTop / height]
    var output = this.brain.predict(inputs);
    if(output[0] > output[1]){
      this.jump();
    }
  }

  incrementScore(pipe) {
    if (pipe != oldPipe) {
      this.score += 1;
      console.log(this.score);
    }
    oldPipe = pipe;
    return this.score.valueOf();
  }

  collision(pipe) {
    if (this.y + birdRad > height || this.y - birdRad < 0) {
      return true;
    }
    if (pipe.x < birdX + birdRad && pipe.x + pipeWidth > birdX - birdRad) {
      if (this.y - birdRad < pipe.pipeTop || this.y + birdRad > pipe.pipeBottom) {
        return true;
      }
    }
    return false;
  }

  mutate(amount) {
    this.brain.mutate(amount);
  }

  jump() {
     this.acc -= jumpForce;
  }
}