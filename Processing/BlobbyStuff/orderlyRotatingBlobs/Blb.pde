class Blb {
  PVector position, velocity, acceleration;
  float radius;
  int frequency;
  float amplitude, rotationSpeed;
  
  color fill = color(random(255), random(255), random(255));
  
  Blb(float _pX, float _pY, float _rad){
    position = new PVector(_pX, _pY);
    radius = _rad;
    
    frequency = (int)map(_pY, height, 0, 5, 15);
    amplitude = map(_pX, 0, width, 5, 25);
  }
  
  void display(){
    fill(fill);
    
    pushMatrix();
    translate(position.x, position.y);
    
    beginShape();
    for(float i = 0; i < TWO_PI ; i+= 0.1){
      rotationSpeed = frameCount*0.1;
      float radiusCoeff = map( sin(i*frequency + rotationSpeed) , -1, 1, -amplitude, amplitude );
      
      float rad = radius + radiusCoeff;
      float x = rad * cos(i);
      float y = rad * sin(i);
      vertex(x, y);
    }
    endShape(CLOSE);
    
    popMatrix();
  }
}
