let cells = [];
let thresholdRad = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);

    cells.push(new Cell);
    noStroke();
}

function draw() {
    background(200);

    cells.forEach((element, index) => {
        element.grow();
        if(element.rad > thresholdRad){
            cells.push(element.mitosis());
        }
        
        element.move();
        element.display();

        if(element.rad < thresholdRad/20){
            cells.splice(index, 1);
        }
    })
}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}