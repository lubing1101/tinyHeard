var canva1, canva2, context1, context2;
var ane, deltaTime, lastTime = Date.now();
var canHeight, canWidth;
document.body.onload = game;
var bgPic = new Image();
var fruit;
var mom;
var mx, my; //鱼当前的位置
var baby;
var data;
var wave;
var dust;


function game() {
	init();
}

function init() {
	//获取canvas
	canva1 = document.getElementById('canvas1');
	context1 = canva1.getContext('2d');
	canva1.addEventListener("mousemove", onMouseMove, false);

	canva2 = document.getElementById('canvas2');
	context2 = canva2.getContext('2d');

	context1.font = "10px Verdana";
	context1.textAlign = "center";

	bgPic.src = "./src/background.jpg";
	canHeight = canva2.height;
	canWidth = canva2.width;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	data = new dataObj();

	wave = new waveObj();

	dust = new dustObj();
	dust.init();

	gameloop();

}

function gameloop() {
	window.requestAnimFrame(gameloop); //该函数定义在commonFunction
	var now = Date.now();
	deltaTime = now - lastTime; //每一帧相差的时间
	lastTime = now;

	if (deltaTime > 40)
		deltaTime = 40;

	drawBackground();
	ane.draw();

	fruit.draw();
	fruitMonitor();
	momFruitsCollision();
	momBabyCollision();
	context1.clearRect(0, 0, canWidth, canHeight);
	mom.draw();
	baby.draw();
	data.draw();
	wave.draw();
	dust.draw();

}

function onMouseMove(e) {
	if (!data.gameOver) {
		if (e.offsetX || e.layerX) {
			mx = e.offSetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}

}