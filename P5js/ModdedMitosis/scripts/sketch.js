let cells = [];

const thresholdDiam = 10
const deathCoeff = thresholdDiam * 2.5
const overcrowdingThreshold = 0.07
const seedThreshold = 0.5

let field;
let lavaColor;

//TODO: make the cells prefer the company of their own kind
// i.e. higher chance of death around others

//TODO: add GUI

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, TWO_PI, 100, 100, 100);

    lavaColor = color(0, 70, 50);
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

        // die of old age/malnutricion/lava
        if ( element.mitosisCounter > 10 || element.diam > deathCoeff || isLava(element.pos.x, element.pos.y, field)) {
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
        if(random() < overcrowdingThreshold){
            cells.splice(element, 1);
        }
    })

    if (cells.length < 4 || random() < 0.1) {
        spontaneouslySeed(seedThreshold);
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
        case 'm':
            noiseSeed();
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
            let noiseVal = noise(x * 0.01, y * 0.01);
            if (noiseVal > 0.4) {
                mapImg.set(x, y, color(PI*1.15, 80, map(noiseVal, 0, 1, 140, 40)));
            } else {
                mapImg.set(x, y, lavaColor);
            }

        }
    }
    mapImg.updatePixels();
    noiseSeed();

    return mapImg;

}

function spontaneouslySeed(_threshold) {
    if (random() > _threshold) {
        cells.push(new Cell);
    }
}

function isLava(_locX, _locY, _image) {
    if (_image.get(_locX, _locY).toString() === lavaColor.levels.toString()) {
        return true;
    } else {
        return false;
    }
}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}