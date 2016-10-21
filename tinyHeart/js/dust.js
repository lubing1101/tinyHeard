var dustObj = function() {

	this.x = [];
	this.y = [];
	this.amp = [];
	this.alpha = 0;
	this.pic = [];
	this.l = 0;

};

dustObj.prototype = {
	num: 30,
	init: function() {
		for (var i = 0; i < this.num; i++) {
			this.x[i] = Math.random() * canWidth;
			this.y[i] = Math.random() * canHeight;
			this.amp[i] = Math.random() * 15 + 25;
			this.pic[i] = new Image();
			this.pic[i].src = "./src/dust" + Math.floor(Math.random() * 7) + ".png";
		}
	},
	draw: function() {
		this.alpha += deltaTime * 0.001;
		this.l = Math.sin(this.alpha);
		for (var i = 0; i < this.num; i++) {
			context1.drawImage(this.pic[i], this.x[i] + this.l * this.amp[i], this.y[i]);
		}
	}

}