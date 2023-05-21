let d
let rain = []
function setup() {
	createCanvas(windowWidth, windowHeight)
	colorMode(RGB, 255, 255, 255, 1);
	rain.push( new Drop(width/2, height/2))
}

function draw() {
	background(0)
	if(random() < 0.1){
		rain.push( new Drop(random(width), random(height)))
	}
	
	rain.forEach((d, i)=>{
		d.update()
		d.display()
		if(d.opacity < 0){
			rain.splice(i, 1)
		}
	})
}
// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}