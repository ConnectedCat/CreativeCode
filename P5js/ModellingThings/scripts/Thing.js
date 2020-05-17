class Thing {
  constructor(_x, _y, _rad, _frameCount) {
    this.position = createVector(_x, _y);
    this.radius = _rad;
    this.resizeCoeff = 1;
    this.birthday = _frameCount;

    this.frequency = map(_y, height, 0, 5, 15);
    this.amplitude = map(_x, 0, width, this.radius * 0.1, this.radius * 0.3);

    this.velocity = p5.Vector.random2D();

    this.desiredVelocity = this.velocity.copy();
    this.acceleration = createVector(0, 0);
    
    print(this.desiredVelocity.toString());
    this.printStatus();
  }

  move(_force, _affected = false) {
    //print(_affected);

    if(_affected){
      this.acceleration.set(_force);
    }
    else {
      this.acceleration.set(createVector(0, 0));
      this.velocity.set(this.desiredVelocity);
      //this.printStatus();
    }
    //print("Accel: " + this.acceleration.toString());
    this.velocity.add(this.acceleration);
    //print("Velocity: " + this.velocity.toString());
    this.position.add(this.velocity);

    if(this.position.x + this.radius >= width){
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    }
    if(this.position.x - this.radius <= 0){
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }
    if(this.position.y + this.radius >= height){
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    }
    if(this.position.y - this.radius <= 0){
      this.position.y = this.radius;
      this.velocity.y *= -1;
    }

  }

  printStatus(){
    print("Vel: " + this.velocity.toString() + "\nDes. vel: " + this.desiredVelocity + "\nAcc: " + this.acceleration.toString() + "\nRadius: " + this.radius);
  }

  resize(_resizeCoeff) {
    this.resizeCoeff = _resizeCoeff * 0.01;
  }

  display() {
    let rotationSpeed = (this.birthday + frameCount) * 0.01;

    let fillC = color(map(sin(rotationSpeed), -1, 1, 0, TWO_PI), 75, 75);
    fill(fillC);
    noStroke();
    push();
    translate(this.position.x, this.position.y);

    beginShape();
    for (let i = 0; i < TWO_PI; i += 0.1) {

      let noisePoint = noise(i, rotationSpeed);
      let radiusCoeff = map(noisePoint, 0, 1, -this.amplitude, this.amplitude);

      let rad = (this.radius + radiusCoeff) * this.resizeCoeff;
      let x = rad * cos(i);
      let y = rad * sin(i);
      vertex(x, y);
    }
    endShape(CLOSE);

    pop();
  }
}