int totalFrames = 120;
int counter = 0;
boolean record = false;

void setup(){
  size(400, 400);
}

void keyPressed(){
  if(key == TAB){
    record = true;
  }
}

void draw(){
  float percent = 0;
  if(record){
    percent = float(counter)/totalFrames;
  }
  else {
    percent = float(frameCount % totalFrames) / totalFrames;
  }

  render(percent);
  
  if(record){
    saveFrame("output/gif-"+nf(counter,3)+".png");
    counter++;
    if(counter == totalFrames)
    {
      exit();
    }
  }
}

void render(float _percent){
  background(0);
  
  float angle = _percent * TWO_PI;
  println(angle);
  translate(width/2, height/2);
  rectMode(CENTER);
  rotate(angle);
  noFill();
  stroke(255);
  strokeWeight(3);
  square(0, 0, 200);
}
