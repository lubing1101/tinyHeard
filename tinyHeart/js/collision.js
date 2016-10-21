//判断大鱼和果实的距离
function momFruitsCollision() {
	if (!data.gameOver) {


		for (var i = 0; i < fruit.num; i++) {
			if (fruit.alive[i]) {
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y); //计算果实与鱼妈妈之间的距离
				if (l < 900) {

					if (fruit.fruitType[i] == "blue") {
						data.double++;
					}
					data.fruitNum++;

					if (mom.bigBodyCount < 7) {
						mom.bigBodyCount++;
					}
					fruit.dead(i);
					wave.born(fruit.x[i], fruit.y[i], "white");

				}
			}
		}
	}
}

//鱼妈妈与小鱼的距离
function momBabyCollision() {
	if (!data.gameOver) {

		var l = calLength2(mom.x, mom.y, baby.x, baby.y);

		if (l < 900 && data.fruitNum > 0) {
			baby.babyBodyCount = 0;
			data.addScore();
			mom.bigBodyCount = 0;
			wave.born(baby.x, baby.y, "orange");
		}
	}

}