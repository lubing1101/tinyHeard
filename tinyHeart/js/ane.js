var aneObj = function() {
	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.amp = [];
	this.alpha = 0;
	this.l = 0;
};
aneObj.prototype = {
	constructor: aneObj,
	num: 50,
	init: function() {
		for (var i = 0; i < this.num; i++) {
			this.rootx[i] = i * 16 + Math.random() * 20;
			this.headx[i] = this.rootx[i];
			this.heady[i] = 300 + Math.random() * 50;
			this.amp[i] = Math.random() * 50 + 100;
		}
	},
	draw: function() {
		this.alpha += deltaTime * 0.001;
		this.l = Math.sin(this.alpha);
		context2.save();
		context2.globalAlpha = 0.6; //设置透明度
		context2.lineWidth = 20;
		context2.lineCap = "round";
		context2.strokeStyle = "#3b154e";

		for (var i = 0; i < this.num; i++) {
			context2.beginPath();
			context2.moveTo(this.rootx[i], canHeight);
			this.headx[i] = this.rootx[i] + this.l * this.amp[i];
			context2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
			context2.stroke();
		}
		context2.restore();
	}
}