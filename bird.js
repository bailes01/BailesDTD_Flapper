class Bird{
  constructor(brain) {
    this.y = height / 2;
    this.vel = 0;
    this.acc = 0;
    this.dead = false;
    console.log(brain);
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
  }

  render(){
    fill(255);
    ellipse(birdX, this.y, birdRad * 2, birdRad * 2);
  }

  think(pipe) {
    var inputs = [this.vel / 19,
                  this.y / height,
                  pipe.x / width,
                  pipe.pipeBottom / height,
                  pipe.pipeTop / height]
    console.log(inputs);
    var output = this.brain.predict(inputs);
    console.log(output);
    if(output[0] > output[1]){

      console.log("jump");
      this.jump();
    }
  }

  die(){
    this.dead = true;
  }

  collision(){

  }
  jump() {
     this.acc -= jumpForce;
  }
}