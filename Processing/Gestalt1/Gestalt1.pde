/*
// Based on:
// https://www.openprocessing.org/sketch/691812
*/

int pass = 1;
int phase = 1;

float a_circ = 0;
float a_rect = PI;
int side = 100;

void setup() {
  size(800, 800);
  noStroke();
}

void draw() {
  background(255);
  
  switch(phase){
    case 1:
      a_circ = rotate_angle(a_circ);
      draw_circles(a_circ);
      if(a_circ >= PI){
        phase = 2;
        pass = 1;
        a_rect = PIE;
      }
      break;
    case 2:
      draw_circles(a_circ);
      if(pass <= 2){
        if(a_rect < PI+HALF_PI){
          a_rect = rotate_angle(a_rect);
        }
        else {
          pass++;
          a_rect = PI;
        }
        draw_rectangles(a_rect, side+side/2, side+side/2);
      }
      else {
        phase = 3;
      }
      break;
    case 3:
      a_circ = rotate_angle(a_circ);
      draw_circles(a_circ);
      if(a_circ >= TWO_PI){
        phase = 4;
        pass = 1;
        a_rect = PI;
      }
      break;
    case 4:
      draw_circles(a_circ);
      if(a_rect < PI*3){
        a_rect = rotate_angle(a_rect);
        draw_rectangles(a_rect, side/2, side/2);
      }
      else {
        phase = 1;
        a_circ = 0;
      }
      break;
    default:
      break;
  }
}

void draw_circles(float angle){
  for (int i = 0; i <= width/200; i++) {
    for (int j = 0; j <= height/200; j++) {
      fill(0);
      pushMatrix();
      translate(50+i*200, 50+j*200);
      rotate(angle);
      arc(0, 0, 100, 100, HALF_PI, TWO_PI, PIE);
      popMatrix();

      pushMatrix();
      translate(150+i*200, 50+j*200);
      rotate(angle);
      arc(0, 0, 100, 100, PI, TWO_PI + HALF_PI, PIE);
      popMatrix();

      pushMatrix();
      translate(50+i*200, 150+j*200);
      rotate(angle);
      arc(0, 0, 100, 100, 0, PI+HALF_PI, PIE);
      popMatrix();

      pushMatrix();
      translate(150+i*200, 150+j*200);
      rotate(angle);
      arc(0, 0, 100, 100, PI+HALF_PI, TWO_PI + PI, PIE);
      popMatrix();
    }
  }
}

void draw_rectangles(float angle, int Xoffset, int Yoffset){
  for(int i = -1; i < width/200; i++){
      for(int j = -1; j < height/200; j++){
          pushMatrix();
          translate(side*pass+i*(side*2)+Xoffset,side+j*(side*2)+Yoffset);
          rotate(angle);
          fill(255);
          rect(0,0,100,100);
          popMatrix();
      }
  }
}

float rotate_angle(float angle){
  return angle += PI/256;
}

void mousePressed(){
  noLoop();
}
void mouseReleased(){
  loop();
}
