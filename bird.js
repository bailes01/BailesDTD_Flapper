class Bird{
  constructor(brain) {
    this.y = height / 2;
    this.vel = 0;
    this.grav = 1;
    if (brain == null) {
      this.brain = new NeuralNetwork(NNI, NNH, NNO);
    } else {
      this.brain = brain;
    }
  }
  applyForce(force) {
    this.accY += this.gravity;
  }
  update() {
    this.vel += this.grav;
    this.y += this.vel;
  }

  think(pipe) {
    var inputs = [this.vel,
                  this.iAcc,
                  this.y / height,
                  pipe.x / width,
                  pipe.top / height,
                  pipe.bottom / height]
  }
  jump() {
    
  }
}