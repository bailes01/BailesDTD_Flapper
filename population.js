class Population{
  constructor() {
    this.birds = [];
    for (var i = 0; i < TOTAL_BIRD_COUNT; i++) {
      this.birds.push(new Bird());
      console.log("bird");
    }
  }

  update_render(){
    var closest = pipes.getClosestPipe();
    if(closest.x < birdX + birdRad / 2 && closest.x + pipeWidth > birdX - birdRad / 2){
      this.birds.forEach(b => {
        if(b.y + birdRad < closest.pipeTop || b.y - birdRad > closest.pipeBottom){
          b.die();
        }
      });
    }
    this.birds.forEach(b => {
      b.think(closest);
      b.update();
      b.render();
    });
    
  }

  render(){

  }

  think() {
    
  }
}