let aBunchOfThings = [];
let sizingSlider, sizingValue;
let windForce;
let windButton, windValue;

function setup() {
    createCanvas(windowWidth, windowHeight - 100);
    colorMode(HSB, TWO_PI, 100, 100);

    windForce = p5.Vector.random2D();

    //UI elements
    //slider
    sizingSlider = createSlider(1, 100, 100);
    sizingSlider.position(20, height+20);
    sizingSlider.style('width', '100px');
    sizingSlider.id("sizingSlider");
    sizingSlider.elt.insertAdjacentHTML('afterend', '<label for="sizingSlider" style="position: absolute; bottom: 40px; left: 20px;">Size</label>');

    windButton = createButton("WIND!");
    windButton.position(140, height+20);
    windValue = false;
}

function draw() {
    background(0, 0, 60);

    windButton.mouseClicked(function(){
        windValue = !windValue;
        print("Wind force applied: " + windForce.toString());
    })

    aBunchOfThings.forEach(function(thing, index){
        thing.resize(sizingSlider.value());
        thing.move(windForce, windValue);
        thing.display();
    })
}

function mouseClicked(){
    if(mouseY < windowHeight - 100){
        aBunchOfThings.push(new Thing(mouseX, mouseY, frameCount));
    }
    
}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
