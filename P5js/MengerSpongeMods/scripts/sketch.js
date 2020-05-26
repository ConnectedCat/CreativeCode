let shapes;
let rotA = 0;
window.colorScale = 300;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    shapes = new Array();
    shapes.push(new Shape(0, 0, 0, window.colorScale));
}

function draw() {
    background(0);
    lights();
    rotateX(rotA);
    rotateZ(rotA*0.1);
    shapes.forEach(shape => {
        shape.draw();
    });
    rotA+= 0.01;
}

function mouseClicked(){
    let nextGen = new Array();

    shapes.forEach(shape => {
        nextGen.push(...shape.generate());
    });
    shapes = nextGen;
}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
