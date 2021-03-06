class Population{
  constructor() {
    this.savedBirds = [];
    this.birds = [];
    this.generation = 1;
    for (var i = 0; i < birdCount; i++) {
      this.birds.push(new Bird());
    }
  }

  update() {
    var closest = pipes.getClosestPipe();
    for (var i = 0; i < this.birds.length; i++){
      this.birds[i].update();
      this.birds[i].think(closest);
      if (this.birds[i].collision(closest)) {
        this.savedBirds.push(this.birds.splice(i, 1)[0]);
        }
      }
    if (this.birds.length === 0) {
      totalScore = 0;
      newGame();
      this.nextGeneration();
    }
  }

  render() {
    this.birds.forEach(bird => {
      bird.render();
    });
    blendMode(BLEND);
    textSize(20);
    fill(255);
    text("Score: " + totalScore, 20, 30);
    text("Gen " + this.generation, 20, 60);
    text("Birds left: " + this.birds.length, 20, 90);
    if (frameCount % 10 == 0) {
      fps = round(frameRate());
    }
    text("Framerate: " + fps, 20, 120);
  }

  calculateFitness() {
    var scoresum = 0;
    this.savedBirds.forEach(sb => {
      scoresum += sb.framesSurvived;
    });
    this.savedBirds.forEach(sb => {
      sb.fitness = sb.framesSurvived / scoresum;

    });
  }

  pickOne() {
    var index = 0;
    var r = random(1);
    while (r > 0) {
      r -= this.savedBirds[index].fitness;
      index++;
    }
    index--;
    let bird = this.savedBirds[index];
    let child = new Bird(bird.brain);
    child.color = color(bird.fitness * 8 * 255, 0, 255, 100 + bird.fitness * 100* 20);
    child.mutate(mutateAmount);
    return child;
  }

  nextGeneration() {
    this.totalscore = 0;
    this.generation += 1;
    this.calculateFitness();
    this.birds = [];
    for (var i = 0; i < birdCount; i++) {
      this.birds[i] = this.pickOne();
    }
    this.savedBirds = [];
  }
}