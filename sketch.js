///<reference path='../../node_modules/@types/p5/global.d.ts'/>
const NNI = 4;
const NNH = 4;
const NNO = 2;
const newPipeRate = 150;
const TOTAL_BIRD_COUNT = 1000;
var birdX;
var pipeWidth;
var pipeGap;
var pipeSpeed;
var pipeMargin;
var pipes;
var pause = true;
var gameCount = 0;

function setup() {
	frameRate(60);
	createCanvas(600, 900);
	background(0);

	birdX = width / 4;
	pipeWidth = width / 5;
	pipeGap = height / 4;
	pipeSpeed = width/200;
	pipeMargin = height / 16;  
	pipes = new Pipes();
}

function draw() {
	if (pause == false) {
		background(0);
		gameCount++;
		pipes.update();
		pipes.render();
	}
}

function keyPressed(){
	if (key == " ") {
		pause = !pause;
	}
}
