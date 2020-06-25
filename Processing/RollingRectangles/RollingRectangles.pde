float angle = PI;
int pass = 1;
int side = 100;

void setup() {
  size(800, 800);
  rectMode(CORNER);
}

void draw() {
  background(0);
  
  for(int i = -1; i < width/200; i++){
      for(int j = -1; j < height/200; j++){
          pushMatrix();
          translate(side*pass+i*(side*2)+side/2,side+j*(side*2)+side/2);
          rotate(angle);
          fill(255);
          rect(0,0,100,100);
          popMatrix();
      }
  }
  if(pass <= 2){
    if(angle < PI+HALF_PI){
      angle += PI/256;
    }
    else {
      pass++;
      angle = PI;
    }
  }
  
  println(pass);
  
} 

void mousePressed(){
  noLoop();
}
void mouseReleased(){
  loop();
}
