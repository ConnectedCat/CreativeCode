//original code from https://youtu.be/s_KIrIJkLoE

float a, b, co = 0;

void setup(){
  size(500, 400);
  background(255);
  colorMode(HSB, 100);
  strokeWeight(3);
  
  smooth();
}

void draw(){
  stroke(co, 80, 80, 20);
  PVector p1 = new PVector(map(sin(a), -1.0, 1.0, 20.0, width-20.0), map(cos(a), -1.0, 1.0, 20.0, height-20.0));
  PVector p2 = new PVector(map(sin(b), -1.0, 1.0, 20.0, width-20.0), map(cos(b), -1.0, 1.0, 20.0, height-20.0));
  
  line(p1.x, p1.y, p2.x, p2.y);
  
  a+=0.03;
  b+=0.07;
  
  co++;
  if(co > 100){
    co = 0;
  }
}
