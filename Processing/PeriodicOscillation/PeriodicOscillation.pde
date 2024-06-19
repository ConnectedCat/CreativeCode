PVector pos;
float circDiam = 120;

int totalFrames = 120;
int counter = 0;
boolean record = true;

void setup(){
  size(600, 600);

  pos = new PVector(width/2, height/2);
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
  fill(200, 160, 180, 70);
  rect(0, 0, width, height);

  //if(pos.x + circDiam/2 >= width ||pos.x - circDiam/2 <= 0){
  //  vel.x *= -1;
  //}
  //pos.add(vel);
  float angle = _percent * TWO_PI;
  //sine:
  //pos.x = sin(angle)*(width/2-circDiam/2) + width/2;
  //triangle wave as per https://www.wikiwand.com/en/Triangle_wave
  pos.x = ((width-circDiam)/PI)*asin(sin(angle))+ width/2;
  noStroke();
  fill(255, 0, 0);
  circle(pos.x, pos.y, circDiam);
}
