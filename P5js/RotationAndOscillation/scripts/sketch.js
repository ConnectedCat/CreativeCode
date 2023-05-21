let radius;
let numRings = 10;
let strWeigth = 20;
function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, TWO_PI, 1, 1);
	
	radius = width*0.1;
	strokeCap(SQUARE);
}

function draw() {
	background(0);
	noFill();
	strokeWeight(strWeigth);
	for(let i = 0; i < numRings; i++){
		stroke(color(i*TWO_PI/numRings, 0.9, 0.9));
		
		push();
		translate(width/2, height/2);
		rotate( sin( millis()*0.001 * (i*0.5+1) ) );
		arc(0, 0, radius*2+strWeigth*i*2, radius*2+strWeigth*i*2, QUARTER_PI+HALF_PI, TWO_PI+ QUARTER_PI);
		pop();
	}
}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}