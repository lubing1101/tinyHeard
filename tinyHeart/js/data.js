var dataObj = function() {
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.alpha = 0;
	this.gameOver = false;

};

dataObj.prototype = {
	constructor: dataObj,
	draw: function() {
		var w = canva1.width;
		var h = canva1.height;
		context1.fillStyle = "white";
		context1.fillText("SCORE:  " + this.score, w * 0.5, h - 20);

		if (this.gameOver) {
			if (this.alpha < 1) {
				this.alpha += deltaTime * 0.0005;
			}
			context1.save()
			context1.font = "20px Verdana";
			context1.fillStyle = "rgba(255,255,255," + this.alpha + ")";
			context1.fillText("GAME OVER", w * 0.5, h * 0.5);
			context1.restore();
		}

	},
	addScore: function() {
		this.score += this.fruitNum * 100 * this.double;
		this.fruitNum = 0;
		this.double = 1;

	}

}