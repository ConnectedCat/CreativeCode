class Thing {
	constructor(_x, _y, _rad, _frameCount){
        this.position = createVector(_x, _y);
        this.radius = _rad;
        this.birthday = _frameCount;

        this.frequency = map(_y, height, 0, 5, 15);
        this.amplitude = map(_x, 0, width, this.radius*0.1, this.radius*0.3);
	}
    
    display(){
    
        let rotationSpeed = (this.birthday+frameCount)*0.01;
        
        let fillC = color(map(sin(rotationSpeed), -1, 1, 0, TWO_PI), 75, 75);
        fill(fillC);
        noStroke();
        push();
        translate(this.position.x, this.position.y);
        
        beginShape();
        for(let i = 0; i < TWO_PI ; i+= 0.1){
          
          let noisePoint = noise(i, rotationSpeed);
          let radiusCoeff = map( noisePoint, 0, 1, -this.amplitude, this.amplitude );
          
          let rad = this.radius + radiusCoeff;
          let x = rad * cos(i);
          let y = rad * sin(i);
          vertex(x, y);
        }
        endShape(CLOSE);
        
        pop();
      }
}