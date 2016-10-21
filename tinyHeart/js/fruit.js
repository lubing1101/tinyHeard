var fruitObj = function() {
	this.alive = []; //是否存活
	this.x = [];
	this.y = [];
	this.aneID = [];
	this.diameter = []; //直径
	this.speed = []; //果实漂浮速度
	this.fruitType = []; //blue or orange
	this.orange = new Image();
	this.blue = new Image();
}

fruitObj.prototype = {
	constructor: fruitObj,
	num: 50,
	init: function() {
		for (var i = 0; i < this.num; i++) {
			this.alive[i] = false;
			this.x[i] = 0;
			this.y[i] = 0;
			this.aneID[i] = 0;
			this.fruitType[i] = "";
			this.speed[i] = Math.random() * 0.005 + 0.01;
			this.born(i);
		}
		this.orange.src = "src/fruit.png";
		this.blue.src = "src/blue.png";
	},
	draw: function() {
		var pic = "";
		for (var i = 0; i < this.num; i++) {
			if (this.alive[i]) {

				if (this.fruitType[i] == "blue") {
					pic = this.blue;
				} else {
					pic = this.orange;
				}
				if (this.diameter[i] <= 10) {
					this.diameter[i] += this.speed[i] * deltaTime;
					this.x[i] = ane.headx[i];
					this.y[i] = ane.heady[i];
					context2.drawImage(pic, this.x[i] - this.diameter[i] * 0.5, this.y[i] - this.diameter[i] * 0.5, this.diameter[i], this.diameter[i]); //最后面两个参数为直径

				} else {
					this.y[i] -= this.speed[i] * deltaTime * 7;
					context2.drawImage(pic, this.x[i] - this.diameter[i] * 0.5, this.y[i] - this.diameter[i] * 0.5, this.diameter[i], this.diameter[i]); //最后面两个参数为直径
				}

				if (this.y[i] < 10) {
					this.alive[i] = false;
				}

			}
		}


	},
	born: function(i) {
		this.aneID[i] = Math.floor(Math.random() * ane.num);
		this.x[i] = ane.rootx[this.aneID[i]];
		this.y[i] = ane.heady[this.aneID[i]];
		this.diameter[i] = 0;
		this.alive[i] = true;
		if (Math.random() < 0.2) {
			this.fruitType[i] = "blue";
		} else {
			this.fruitType[i] = "orange";
		}
	},
	dead: function(i) {
		this.alive[i] = false;
	}


};
// 发送果实,由fruitMonitor控制
var sendfruit = function() {
	for (var i = 0; i < fruit.num; i++) {
		if (!fruit.alive[i]) {
			fruit.born(i);
			return;
		}
	}

};
//控制果实数量
var fruitMonitor = function() {
	var num = 0;
	for (var i = 0; i < fruit.num; i++) {
		if (fruit.alive[i])
			num++;
	}
	if (num < 15) {
		sendfruit();
		return;
	}

};