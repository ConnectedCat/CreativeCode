class Blb {
  PVector position, velocity, acceleration;
  float radius;
  int frequency, birthday;
  float amplitude, rotationSpeed;
  
  color fill;
  
  Blb(float _pX, float _pY, float _rad, int _frameCount){
    position = new PVector(_pX, _pY);
    radius = _rad;
    birthday = _frameCount;
    
    frequency = (int)map(_pY, height, 0, 5, 15);
    amplitude = map(_pX, 0, width, radius*0.1, radius*0.3);
  }
  
  void display(){
    
    rotationSpeed = (birthday+frameCount)*0.01;
    
    fill = color(map(sin(rotationSpeed), -1, 1, 0, TWO_PI), 75, 75);
    fill(fill);
    
    pushMatrix();
    translate(position.x, position.y);
    
    beginShape();
    for(float i = 0; i < TWO_PI ; i+= 0.1){
      
      float noisePoint = noise(i, rotationSpeed);
      float radiusCoeff = map( noisePoint, 0, 1, -amplitude, amplitude );
      
      float rad = radius + radiusCoeff;
      float x = rad * cos(i);
      float y = rad * sin(i);
      vertex(x, y);
    }
    endShape(CLOSE);
    
    popMatrix();
  }
}
