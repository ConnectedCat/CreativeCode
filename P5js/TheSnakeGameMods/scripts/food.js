class Food {
    constructor(){
        this.pos = createVector(floor(random(cols))*gridScl, floor(random(rows))*gridScl);
        this.noisePos = createVector(0, 0, 0);
        this.colr = this.generateColor();
    }

    show(){
        fill(this.colr);
        rect(this.pos.x, this.pos.y, gridScl, gridScl);
    }

    drop(){
        this.pos = createVector(floor(random(cols))*gridScl, floor(random(rows))*gridScl);
        this.colr = this.generateColor();
    }

    generateColor(){
        this.noisePos.x += 0.5;
        let H = map(noise(this.noisePos.x, this.noisePos.y, this.noisePos.z), 0, 1, 0, 360);

        this.noisePos.y += 0.5;
        let S = map(noise(this.noisePos.x, this.noisePos.y, this.noisePos.z), 0, 1, 0, 100); 
        this.noisePos.z += 0.5;

        let B = map(noise(this.noisePos.x, this.noisePos.y, this.noisePos.z), 0, 1, 0, 100);

        let generatedColor = color(H, S, B);
        return generatedColor;
    }
}