///<reference path='../../node_modules/@types/p5/global.d.ts'/>
const NNI = 5;
const NNH = 4;
const NNO = 2;
const newPipeRate = 180;
var birdCount = 10;
var totalScore = 0;
var gravity;
var birdRad;
var jumpForce;
var oldPipe = 0;
var birdX;
var pipeWidth;
var pipeGap;
var pipeSpeed;
var pipeMargin;
var pipes;
var pause = true;
var gameCount = 0;
var population;
var speedSlider;
var speedLabel;
var popSlider;
var popLabel;
var speed;
var cnvs;
var cnvscontainer = document.getElementById("cnvs-container");
var controlscontainer = document.getElementById("controls");
var winsizes = [
  [1000, 1500],
  [800, 1200],
	[600, 900],
	[400, 600]
];
const mutateAmount = 0.1;

function setup() {
  console.log(window.innerHeight);
  for (var i = 0; i < winsizes.length; i++) {
    var ws = winsizes[i];
    if (ws[1] < parseInt(window.innerHeight)) {
      var windowSize = ws;
      break;
    }
  }

  cnvs = createCanvas(windowSize[0], windowSize[1]);
  frameRate(60);
  cnvs.parent(cnvscontainer);
  background(0);
  speedSlider = createSlider(1, 100, 1);
  speedLabel = createElement("p", "Speed: " + speedSlider.value());
  popSlider = createSlider(10, 2000, 100);
  popLabel = createElement("p", "Pop: " + popSlider.value());
  speedLabel.parent(controlscontainer);
  speedSlider.parent(controlscontainer);
  popLabel.parent(controlscontainer);
  popSlider.parent(controlscontainer);
  speed = speedSlider.value();
  birdCount = popSlider.value();
  speedSlider.input(changeSpeed);
  popSlider.input(changePop);
  birdRad = height / 30;
  gravity = height / 600;
  jumpForce = height / 20;
  birdX = width / 4;
  pipeWidth = width / 5;
  pipeGap = height / 3.5;
  pipeSpeed = width / 200;
  pipeMargin = height / 16;
  pipes = new Pipes();
  population = new Population();
}

function draw() {
  if (pause == false) {
    background(0);
    for (var i = 0; i < speed; i++) {
      gameCount++;
      pipes.update();
      population.update();
    }
    pipes.render();
    population.render();
  }
}

function changePop() {
  birdCount = popSlider.value();
  popLabel.html("Pop: " + popSlider.value());
}
function changeSpeed() {
  speed = speedSlider.value();
  speedLabel.html("Speed: " + speedSlider.value());
}

function keyPressed() {
  if (key == " ") {
    pause = !pause;
  }
}

function newGame() {
  gameCount = 0;
  pipes = new Pipes();
}
