///<reference path='../../node_modules/@types/p5/global.d.ts'/>
const NNI = 5;
const NNH = 4;
const NNO = 2;
const newPipeRate = 120;
const TOTAL_BIRD_COUNT = 10;
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
var slider;
const mutateAmount = 0.1;

function setup() {
	frameRate(60);
	createCanvas(600, 900);
	background(0);
	slider = createSlider(1, 100, 1);
	birdRad = height / 30;
	gravity = height / 600;
	jumpForce = height / 25;
	birdX = width / 4;
	pipeWidth = width / 5;
	pipeGap = height / 4;
	pipeSpeed = width/200;
	pipeMargin = height / 16;  
	pipes = new Pipes();
	population = new Population();
	
}

function draw() {
	if (pause == false) {
		background(0);
		
		for (var i = 0; i < slider.value(); i++){
			gameCount++;
			pipes.update();
			population.update();
		}
		pipes.render();
		population.render();
		
	}
}

function keyPressed(){
	if (key == " ") {
		pause = !pause;
		
	}
}

function newGame() {
	gameCount = 0;
	pipes = new Pipes();
}


