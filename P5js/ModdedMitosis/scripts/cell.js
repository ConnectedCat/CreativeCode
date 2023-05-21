class Cell {
    constructor(_diam = random(thresholdDiam / 5, thresholdDiam / 2), _pos = createVector(random(width), random(height))) {
        this.diam = _diam
        this.noisePos = 0
        this.pos = _pos
        this.mitosisCounter = 0

        this.destiny = random([0, 1])
        this.color = (this.destiny != 0) ? color(random(PI*0.25), random(70,100), 100, 80) : color(random(PI*0.5, PI*0.75), random(70,100), 100, 80)
    }

    move() {
        this.pos.add(p5.Vector.random2D().mult(this.diam * 0.3));

        this.pos.x = constrain(this.pos.x, this.diam, width - this.diam);
        this.pos.y = constrain(this.pos.y, this.diam, height - this.diam);
    }

    grow() {
        this.noisePos += 0.05;
        let path = (this.destiny != 0) ? noise(this.noisePos, 0) : noise(0, this.noisePos);
        this.diam += map(path, 0, 1, -1, 1.55);
    }

    mitosis() {
        let newDiam = sqrt(this.diam)
        this.diam = newDiam
        this.mitosisCounter++
        return new Cell(newDiam, this.pos.copy())
    }

    overlap(_pos, _diam) {
        if (this.pos.dist(_pos) < (this.diam/2 + _diam/2)) {
            return true;
        } else {
            return false;
        }
    }

    display() {
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.diam, this.diam);
    }
}