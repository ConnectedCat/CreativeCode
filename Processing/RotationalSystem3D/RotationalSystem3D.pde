import controlP5.*;
ControlP5 cp5;

float vX = 1.0;
float vY, vZ, v2X, v2Z = 0.0;
float v2Y  = 0.5;

Planet sun;

ArrayList<PVector> stars = new ArrayList<PVector>();

void setup() {
  size(1000, 1000, P3D);  

  for (int x = -width; x < width*2; x++) {
    for (int y = -height; y < height*2; y++) {
      if (random(1) < 0.0001) {
        stars.add(new PVector(x, y));
      }
    }
  }
  
  cp5 = new ControlP5(this);
  cp5.addSlider("vX").setPosition(20, 20).setSize(10, 100).setRange(0, 1).setNumberOfTickMarks(11);
  cp5.addSlider("vY").setPosition(60, 20).setSize(10, 100).setRange(0, 1).setNumberOfTickMarks(11);
  cp5.addSlider("vZ").setPosition(100, 20).setSize(10, 100).setRange(0, 1).setNumberOfTickMarks(11);
  cp5.addSlider("v2X").setPosition(140, 20).setSize(10, 100).setRange(0, 1).setNumberOfTickMarks(11);
  cp5.addSlider("v2Y").setPosition(180, 20).setSize(10, 100).setRange(0, 1).setNumberOfTickMarks(11);
  cp5.addSlider("v2Z").setPosition(220, 20).setSize(10, 100).setRange(0, 1).setNumberOfTickMarks(11);
  

  sun = new Planet(20, 0);
  sun.spawnMoons(1, 1);

  background(0);
  noStroke();
}

void draw() {
  background(0);
  lights();

  for ( PVector star : stars) {
    stroke(random(150, 255));
    point(star.x, star.y, -600);
  }
  noStroke();
  
  pushMatrix();
  translate(width/2, height/2);
  sun.show();
  sun.orbit();
  popMatrix();
}

void slider(float value) {
  println("a slider event. setting value to "+value);
}

void keyPressed(){
  if(key == TAB){
    noLoop();
  }
  else{
    loop();
  };
}
