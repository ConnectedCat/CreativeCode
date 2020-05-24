let numStars;
let stars = new Array();
let backColor;
let pbackColor;

function setup() {
    createCanvas(windowWidth, windowHeight);
    numStars = 200;

    colorMode(HSB, 360, 100, 100, 1);


    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function draw() {
    // backColor = color(map(sin(frameCount/10), -1, 1, 0, 360), 50, 50);

    background(color(map(sin(frameCount/500), -1, 1, 0, 360), 50, 50));
    translate(width / 2, height / 2);
    stars.forEach((star) => {
        star.update();
        star.display();
    })


}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Star {
    constructor() {
        this.x = random(-width, width); // 300
        this.y = random(-height, height); // 200
        this.coeff = random(width); //150
        this.pCoeff = this.coeff;

        this.sizeCoeff = random(10, 40);

        this.color = color(random(360), random(80, 100), random(80, 100));
    }

    update() {
        this.coeff = this.coeff -   10;

        if (this.coeff < 5) {
            this.coeff = width;
            this.pCoeff = this.coeff;

            this.x = random(-width, width); // 300
            this.y = random(-height, height); // 200
        }
    }

    display() {
        fill(this.color);
        noStroke();
        let sx = map(this.x / this.coeff, 0, 1, 0, width / 2);
        let sy = map(this.y / this.coeff, 0, 1, 0, height / 2);
        let rad = map(this.coeff, 0, width, this.sizeCoeff, 0 );
        ellipse(sx, sy, rad, rad);

        let px = map(this.x/this.pCoeff, 0, 1, 0, width/2);
        let py = map(this.y/this.pCoeff, 0, 1, 0, height/2);

        stroke(this.color);
        line(px, py, sx, sy);
        // if(frameCount % 10 == 0){
        //     this.pCoeff = this.coeff;
        // }
    }
}