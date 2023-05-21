class Flower {
	constructor(_x, _y) {
		this.pos = createVector(_x, _y);
		this.radius = random(100, 200);
		this.numPetals = int(random(5, 9));
		this.hue = random(0, TWO_PI);
		
		this.tip = createVector(this.radius/2, 0);
	}

	bloom() {
		if(this.tip.x < this.radius){
			this.tip.x += 0.3;
		}
	}

	display() {
		//petals
		// for (let i = 0; i < TWO_PI; i += TWO_PI / this.numPetals) {
		// 	stroke(i, 1, 1);
		// 	line(this.pos.x, this.pos.y, this.pos.x + cos(i) * this.radius, this.pos.y + sin(i) * this.radius);
		// }
		
		//petals 2
		for (let i = 0; i < TWO_PI; i += TWO_PI / this.numPetals) {
			push();
			translate(this.pos.x, this.pos.y);
			rotate(i);
			stroke(this.hue, 1, 1);
			fill(this.hue, 0.6, 1);
			let p1X = 0;
			let p1Y = 0;
			let c1X = cos(TWO_PI / this.numPetals) * this.radius*0.3;
			let c1Y = sin(TWO_PI / this.numPetals) * this.radius*0.3;
			let c2X = (cos(TWO_PI / this.numPetals) * this.radius*0.3) + this.radius*0.6;
			let c2Y = sin(TWO_PI / this.numPetals) * this.radius*0.3;
			let c3X = cos(TWO_PI / this.numPetals) * this.radius*0.3;
			let c3Y = - sin(TWO_PI / this.numPetals) * this.radius*0.3;
			let c4X = (cos(TWO_PI / this.numPetals) * this.radius*0.3) + this.radius*0.6;
			let c4Y = - sin(TWO_PI / this.numPetals) * this.radius*0.3;
			let p2X = this.tip.x;
			let p2Y = this.tip.y;
			beginShape();
			vertex(p1X, p1Y);
			bezierVertex(c1X, c1Y, c2X, c2Y, p2X, p2Y);
			vertex(p1X, p1Y);
			bezierVertex(c3X, c3Y, c4X, c4Y, p2X, p2Y);
			endShape();
			pop();
		}
		
		//center
		noFill();
		for (let i = 0; i < this.radius/2; i++) {
			let hue = map(i, 0, this.radius/2, this.hue - QUARTER_PI, this.hue + QUARTER_PI);
			stroke(hue, 0.8, 0.8);
			circle(this.pos.x, this.pos.y, i);
		}
	}
}