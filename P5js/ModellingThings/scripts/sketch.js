let aBunchOfThings = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, TWO_PI, 100, 100);
    // for (let i = 1; i < 20; i++) {
    //     aBunchOfThings[i] = new Thing(random(width), random(height), random(width/4), random(width/4));
    //     print("Width: " + width / i + " height: " + height / i);
    // }
}

function draw() {
    background(TWO_PI, 0, 100);
    fill(255);
    for (let i = 1; i < aBunchOfThings.length; i++) {
        aBunchOfThings[i].display();
    }
}

function mouseClicked(){
    aBunchOfThings.push(new Thing(mouseX, mouseY, random(width/20, width/15), frameCount));
}


// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}