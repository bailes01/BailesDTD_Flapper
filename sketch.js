///<reference path='../../node_modules/@types/p5/global.d.ts'/>
const NNI = 5;
const NNH = 4;
const NNO = 2;
const newPipeRate = 150;
const TOTAL_BIRD_COUNT = 100;
const jumpForce = 2;
const gravity = 1;
const birdRad = 15;
var birdX;
var pipeWidth;
var pipeGap;
var pipeSpeed;
var pipeMargin;
var pipes;
var pause = true;
var gameCount = 0;
var population

var bird;

function setup() {
	frameRate(60);
	createCanvas(400, 600);
	background(0);

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
		gameCount++;
		pipes.update();
		pipes.render();
		population.update_render();
	}
}

function keyPressed(){
	if (key == " ") {
		pause = !pause;
	}
}
