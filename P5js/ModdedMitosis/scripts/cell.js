class Cell{
    constructor(_rad = random(thresholdRad/5, thresholdRad/2), _pos = createVector(random(width), random(height))){
        this.rad = _rad;
        this.noisePos = 0;
        this.color = color(random(50, 200), random(255), 0, 120);
        this.pos = _pos;

        this.destiny = random([0, 1]);
        console.log(this.destiny);
    }

    move(){
        this.pos.add(p5.Vector.random2D().mult(5));
        this.pos.x = constrain(this.pos.x, this.rad, width - this.rad);
        this.pos.y = constrain(this.pos.y, this.rad, height - this.rad);
    }

    grow(){
        this.noisePos += 0.05;
        let path = (this.destiny != 0) ? noise(this.noisePos, 0) : noise(0, this.noisePos);
        this.rad += map(path, 0, 1, -1, 1.55);
    }

    mitosis(){
        let newRad = sqrt(this.rad);
        this.rad = newRad;
        return new Cell(newRad, this.pos.copy());
    }

    display(){
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    }
}