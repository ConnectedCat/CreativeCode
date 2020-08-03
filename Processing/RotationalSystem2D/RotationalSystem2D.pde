Planet sun;

void setup(){
  size(1000, 1000);
  
  sun = new Planet(20, 0);
  sun.spawnMoons(5, 1);
  
  background(0);
  noStroke();
}

void draw(){
  //background(0);
  translate(width/2, height/2);
  sun.show();
  sun.orbit();
}
