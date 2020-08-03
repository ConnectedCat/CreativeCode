Planet sun;

ArrayList<PVector> stars = new ArrayList<PVector>();

void setup(){
  size(1000, 1000, P3D);
  
  for(int x = -width; x < width*2; x++){
    for(int y = -height; y < height*2; y++){
      if(random(1) < 0.0001){
        stars.add(new PVector(x, y));  
      }
    }
  }
  
  sun = new Planet(20, 0);
  sun.spawnMoons(5, 1);
  
  background(0);
  noStroke();
}

void draw(){
  background(0);
  lights();
  
  for( PVector star : stars){
    stroke(random(150, 255));
    point(star.x, star.y, -600);
  }
  noStroke();
  
  translate(width/2, height/2);
  sun.show();
  sun.orbit();
}
