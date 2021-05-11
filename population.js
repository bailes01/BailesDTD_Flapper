class Population{
  constructor() {
    this.birds = [];
    for (int i = 0; i < TOTAL_BIRD_COUNT; i++) {
      this.birds.push(new Bird());
    }
  }
  think() {
    var closest = pipes.getClosestPipe();
    this.birds.forEach(b => {
      b.think(closest);
    });
  }
}