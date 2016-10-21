var waveObj = function() {

	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
	this.style = []
};
waveObj.prototype = {
	constructor: waveObj,
	num: 10,
	init: function() {
		for (var i = 0; i < this.num; i++) {
			this.alive[i] = false;
			this.r[i] = 0;
			this.style[i] = "";
		}
	},
	draw: function() {
		context1.save();
		context1.lineWidth = 2;
		context1.shadowBlur = 5;

		for (var i = 0; i < this.num; i++) {
			if (this.alive[i]) {
				this.r[i] += deltaTime * 0.04;
				if (this.r[i] > 50) {
					this.alive[i] = false;
					continue;
				}

				var alpha = 1 - this.r[i] / 50;
				context1.beginPath();

				context1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
				context1.closePath();
				if (this.style[i] == "white") {
					context1.strokeStyle = "rgba(255,255,255," + alpha + ")";
					context1.shadowColor = "white";
				} else {
					context1.strokeStyle = "rgba(134,45,145," + alpha + ")";
					context1.shadowColor = "orange";
				}

				context1.stroke()

			}
		}
		context1.restore();

	},
	born: function(x, y, style) {

		for (var i = 0; i < this.num; i++) {
			if (!this.alive[i]) {
				this.alive[i] = true;
				this.r[i] = 20;
				this.x[i] = x;
				this.y[i] = y;
				this.style[i] = style;
				return;
			}
		}

	}


}