let flrs = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, TWO_PI, 1, 1);
	background(PI, 0.2, 0.7);
	flrs.push(new Flower(width / 2, height / 2));

}

function draw() {
	background(PI, 0.5, 0.9);

	flrs.forEach((flr) => {
		flr.display();
	});

	let target = 1 + constrain(floor(frameCount / 120), 0, 20);
	let count = 0;
	for (let i = 0; i < 1000; i++) {
		if (addFlower()) {
			count++;
		}
		// We made enough
		if (count == target) {
			break;
		}
	}

	// We can't make any more
	if (count < 1) {
		noLoop();
		console.log("finished");
	}
}

function addFlower() {
	let f = new Flower(random(width), random(height));

	// flrs.forEach((flr) => {
	// 	if(dist(f.x, f.y, flr.x, flr.y) < flr.radius/2){
	// 		f = undefined;
	// 		break;
	// 	}
	// });

	for (let i = 0; i < flrs.length; i++) {
		let flr = flrs[i];
		if (dist(f.pos.x, f.pos.y, flr.pos.x, flr.pos.y) < flr.radius) {
			f = undefined;
			break;
		}
	}

	if (f) {
		flrs.push(f);
		return true;
	} else {
		return false;
	}

}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}