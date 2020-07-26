class Datapoint{
    constructor(_pos = createVector(random(width), random(height))){
        this.pos = _pos;
        this.radius = random(10, 30);

        this.clr = color(0);

        //movement
        this.velocity = createVector(random(-0.2, 0.2), random(-0.2, 0.2));
        this.acceleration = createVector(random(-0.2, 0.2), random(-0.2, 0));
    }

    update(){
        this.pos.add(this.velocity.add(this.acceleration));

        if(this.pos.x >= width || this.pos.x <= 0 ) this.velocity.x *= -1;
        if(this.pos.y >= height || this.pos.y <= 0 ) this.velocity.y *= -1;
    }

    show(){
        fill(this.clr);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    }
}