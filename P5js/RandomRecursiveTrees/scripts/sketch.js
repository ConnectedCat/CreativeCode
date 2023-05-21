let myTrees = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  
  //myTrees.push(new Tree(createVector(width / 2, height)));
  
}

function draw(){
  background(180, 80, 60);
  myTrees.forEach((tree) => {
    tree.displayTree();
  });
}

function mouseReleased(){
  myTrees.push(new Tree(createVector(mouseX, height)));
}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}