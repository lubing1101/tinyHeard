var babyObj = function() {
	this.x;
	this.y;
	this.angle = 0;

	this.babyTailCount = 0;
	this.babyTailTimer = 0;
	this.babyTail = [];

	this.babyEye = [];
	this.babyEyeCount = 0;
	this.babyEyeTimer = 0;
	this.babyEyeInterval = 1000;

	this.babyBody = [];
	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}

babyObj.prototype = {
	constructor: babyObj,
	init: function() {

		this.x = canWidth * 0.5 - 50;
		this.y = canHeight * 0.5 - 50;

		for (var i = 0; i < 8; i++) {
			this.babyTail[i] = new Image();
			this.babyTail[i].src = "./src/babyTail" + i + ".png";
		}

		for (var i = 0; i < 2; i++) {
			this.babyEye[i] = new Image();
			this.babyEye[i].src = "./src/babyEye" + i + ".png";
		}

		for (var i = 0; i < 20; i++) {
			this.babyBody[i] = new Image();
			this.babyBody[i].src = "./src/babyFade" + i + ".png";
		}


	},
	draw: function() {

		this.x = lerpDistance(mom.x, this.x, 0.98);
		this.y = lerpDistance(mom.y, this.y, 0.98);

		var deltaX = mom.x - this.x;
		var deltaY = mom.y - this.y;
		var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-PI~ PI

		//tail 动画
		this.babyTailTimer += deltaTime;
		if (this.babyTailTimer > 50) {
			this.babyTailCount = (this.babyTailCount + 1) % 8;
			this.babyTailTimer = this.babyTailTimer % 50;
		}

		//眼睛动画
		this.babyEyeTimer += deltaTime;
		if (this.babyEyeTimer > this.babyEyeInterval) {
			this.babyEyeCount = (this.babyEyeCount + 1) % 2;
			this.babyEyeTimer %= this.babyEyeInterval;

			if (this.babyEyeCount == 0) {
				this.babyEyeInterval = Math.random() * 1500 + 2000;
			} else {
				this.babyEyeInterval = 200;
			}
		}

		//body 动画
		this.babyBodyTimer += deltaTime;
		if (this.babyBodyTimer > 200) {
			if (this.babyBodyCount < 19)
				this.babyBodyCount = this.babyBodyCount + 1;
			else {
				data.gameOver = true;
			}
			this.babyBodyTimer = this.babyBodyTimer % 200;

		}


		this.angle = lerpAngle(beta, this.angle, 0.6);

		context1.save();

		context1.translate(this.x, this.y);
		context1.rotate(this.angle);
		context1.drawImage(this.babyTail[this.babyTailCount], -this.babyTail[this.babyTailCount].width * 0.5 + 23, -this.babyTail[this.babyTailCount].height * 0.5);
		context1.drawImage(this.babyBody[this.babyBodyCount], -this.babyBody[this.babyBodyCount].width * 0.5, -this.babyBody[this.babyBodyCount].height * 0.5);
		context1.drawImage(this.babyEye[this.babyEyeCount], -this.babyEye[this.babyEyeCount].width * 0.5, -this.babyEye[this.babyEyeCount] * 0.5);

		context1.restore();

	},
}