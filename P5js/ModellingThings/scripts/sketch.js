let aBunchOfThings = [];
let sizingSlider, sizingValue;
let windButton, windResetButton, windValue;
let largestSize, smallestSize;
let windForce;

function setup() {
    createCanvas(windowWidth, windowHeight-100);
    colorMode(HSB, TWO_PI, 100, 100);
    // for (let i = 1; i < 20; i++) {
    //     aBunchOfThings[i] = new Thing(random(width), random(height), random(width/4), random(width/4));
    //     print("Width: " + width / i + " height: " + height / i);
    // }

    largestSize = width/15;
    smallestSize = width/20;

    windForce = p5.Vector.random2D();
    print(windForce.toString());


    // UI elements
    // slider
    sizingSlider = createSlider(1, 100, 100);
    sizingSlider.position(20, height + 20);
    sizingSlider.style('width', '100px');
    sizingSlider.id("sizingSlider");
    sizingSlider.elt.insertAdjacentHTML('afterend', '<label for="sizingSlider" style="position: absolute;bottom: 40px;left: 20px;">Size</label>');
    

    //button
    windButton = createButton('WIND ON!');
    windButton.position(140, height+20);
    windValue = false;
    windResetButton = createButton('reset wind');
    windResetButton.position(220, height+20);
}

function draw() {
    background(TWO_PI, 0, 100);
    fill(255);
    // UI stuff goes first
    if(sizingValue !== sizingSlider.value()){
        aBunchOfThings.forEach(function(thing, index){
            thing.resize(sizingSlider.value());
        })
        sizingValue = sizingSlider.value();
    }

    windButton.mouseClicked(function(){
        windValue = !windValue;
        print("Wind force: " + windForce.toString());
    })
    windResetButton.mouseClicked(function(){
        windForce = p5.Vector.random2D();
        print("Wind force: " + windForce.toString());
    })

    if(windValue){
        const center = createVector(width/2, height/2);
        let windIndicator = p5.Vector.mult(windForce, 100);
        windIndicator.add(center);
        stroke(0);
        strokeWeight(3);
        line(center.x, center.y, windIndicator.x, windIndicator.y);
        noStroke();
        fill(0, 100, 100);
        ellipse(windIndicator.x, windIndicator.y, 6, 6);
    }

    aBunchOfThings.forEach(function(thing, index){
        thing.move(windForce, windValue);
        thing.display();
    })
}

function mouseClicked(){
    let make = true;
    aBunchOfThings.forEach(function(thing, index){
        if(dist(mouseX, mouseY, thing.position.x, thing.position.y) < thing.radius){
            thing.printStatus();
            make = false;
        }
    })

    if(mouseX < width-largestSize && mouseX > 0+largestSize && mouseY > 0+largestSize && mouseY < height-largestSize && make){
        aBunchOfThings.push(new Thing(mouseX, mouseY, random(smallestSize, largestSize), frameCount));
    }
}

function keyTyped(){
    if(key === '1'){
        aBunchOfThings[0].printStatus();
    }
}


// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


/* AN AWESOME BUILT SIM:
*  https://www.youtube.com/watch?v=r_It_X7v-1E
*  https://github.com/SebLague/Ecosystem-2
*/