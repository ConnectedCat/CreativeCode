let cells = [];

let thresholdDiam = 20;
let deathCoeff = thresholdDiam * 0.3;
let field;

let lavaColor;

function setup() {
    createCanvas(windowWidth, windowHeight);

    lavaColor = color(50, 50, 50);
    field = createNoiseMap(width, height);

    cells.push(new Cell);
    noStroke();

    frameRate(10);
}

function draw() {
    image(field, 0, 0);
    let neighbours = [];

    cells.forEach((element, index) => {
        element.grow();
        if (element.diam > thresholdDiam) {
            cells.push(element.mitosis());
        }

        element.move();

        // die of malnutrition/lava
        if (element.diam < thresholdDiam / deathCoeff || isLava(element.pos.x, element.pos.y, field)) {
            cells.splice(index, 1);
        }
        //check for neighbours
        for (let j = index + 1; j < cells.length; j++) {
            if(element.overlap(cells[j].pos, cells[j].diam) && neighbours.indexOf(index) < 0 ){
                neighbours.push(index);
                neighbours.push(j);
            }
        }

        element.display();
    })

    //die of overcrowding
    neighbours.forEach((element) => {
        if(random() < 0.03){
            cells.splice(element, 1);
        }
    })

    if (cells.length < 4 || random() < 0.1) {
        spontaneouslySeed();
    }


}

// LOCAL HELPERS:

function keyPressed() {
    switch (key) {
        case 's':
            noLoop();
            break;
        case 'r':
            loop();
            break;
        default:
            break;
    }
}

function createNoiseMap(_w, _h) {
    let c;
    let mapImg = createImage(_w, _h);
    mapImg.loadPixels();


    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            if (noise(x * 0.01, y * 0.01) > 0.4) {
                mapImg.set(x, y, color(50, 100, 200));
            } else {
                mapImg.set(x, y, lavaColor);
            }

        }
    }
    mapImg.updatePixels();
    noiseSeed();

    return mapImg;

}

function spontaneouslySeed() {
    if (random() > 0.6) {
        cells.push(new Cell);
    }
}

function isLava(_locX, _locY, _image) {
    let currentColor = color(_image.get(_locX, _locY));
    if (currentColor.toString() === lavaColor.toString()) {
        return true;
    } else {
        return false;
    }
}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}