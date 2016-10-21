var momObj = function() {
	this.x;
	this.y; //鱼的坐标
	this.angle; //鱼的角度

	this.bigEye = [];
	this.bigEyeCount = 0;
	this.bigEyeTimer = 0;
	this.bigEyeInterval = 1000;

	this.bigTail = [];
	this.bigTailCount = 0;
	this.bigTailTimer = 0;

	this.bigBodyOra = [];
	this.bigBodyBlue = [];
	this.bigBodyCount = 0;

};
momObj.prototype = {
	constructor: momObj,
	init: function() {
		this.x = canHeight * 0.5;
		this.y = canWidth * 0.5;
		this.angle = 0;

		for (var i = 0; i < 8; i++) {
			this.bigBodyOra[i] = new Image();
			this.bigBodyOra[i].src = "./src/bigSwim" + i + ".png";

			this.bigBodyBlue[i] = new Image();
			this.bigBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
		}

		for (var i = 0; i < 8; i++) {
			this.bigTail[i] = new Image();
			this.bigTail[i].src = "./src/bigTail" + i + ".png";
		}

		for (var i = 0; i < 2; i++) {
			this.bigEye[i] = new Image();
			this.bigEye[i].src = "./src/bigEye" + i + ".png";
		}
	},
	draw: function() {

		this.x = lerpDistance(mx, this.x, 0.98);
		this.y = lerpDistance(my, this.y, 0.98);

		var deltaX = mx - this.x;
		var deltaY = my - this.y;
		var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-PI~ PI
		this.angle = lerpAngle(beta, this.angle, 0.9);



		//tail 动画
		this.bigTailTimer += deltaTime;
		if (this.bigTailTimer > 50) {

			this.bigTailCount = (this.bigTailCount + 1) % 8;
			this.bigTailTimer = this.bigTailTimer % 200;
		}

		//眼睛动画
		this.bigEyeTimer += deltaTime;
		if (this.bigEyeTimer > this.bigEyeInterval) {

			this.bigEyeCount = (this.bigEyeCount + 1) % 2;
			this.bigEyeTimer %= this.bigEyeInterval;

			if (this.bigEyeCount == 0) {
				this.bigEyeInterval = Math.random() * 1500 + 2000;
			} else {
				this.bigEyeInterval = 200;
			}
		}

		context1.save(); //下面的操作只影响鱼妈妈，不对其他进行影响

		context1.translate(this.x, this.y);
		context1.rotate(this.angle);
		context1.drawImage(this.bigTail[this.bigTailCount], -this.bigTail[this.bigTailCount].width * 0.5 + 30, -this.bigTail[this.bigTailCount].height * 0.5);

		if (data.double == 1) {
			context1.drawImage(this.bigBodyOra[this.bigBodyCount], -this.bigBodyOra[this.bigBodyCount].width * 0.5, -this.bigBodyOra[this.bigBodyCount].height * 0.5);

		} else {
			context1.drawImage(this.bigBodyBlue[this.bigBodyCount], -this.bigBodyBlue[this.bigBodyCount].width * 0.5, -this.bigBodyBlue[this.bigBodyCount].height * 0.5);

		}

		context1.drawImage(this.bigEye[this.bigEyeCount], -this.bigEye[this.bigEyeCount].width * 0.5, -this.bigEye[this.bigEyeCount].height * 0.5);

		context1.restore();
	},
};