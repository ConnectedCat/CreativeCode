PVector[][] dots;

float radius = 50;

int step;
float currentStep = 0;
float increment = 1.0;

boolean bMovedown = true;

color pixelColor;
PGraphics pg;

void setup(){
  size(1000, 1000);
  
  step = width/10;
  //dots = new PVector[width][height];
  
  dots = new PVector[width/step][height/step];
  for(int x = 0; x < width/step; x += 2){
    for(int y = 0; y < height/step; y += 2){
      dots[x][y] = new PVector(step*x + step/2, step*y + step/2);
    }
  }
  
  pg = createGraphics(360, 360);
  pg.colorMode(HSB);
  pg.beginDraw();
  
  for(int x = 0; x < width; x++){
    for(int y = 0; y < height; y ++){
      
      pixelColor = color(x, y, 100);
      pg.stroke(pixelColor);
      pg.point(x, y);
      
    }
  }
  
  pg.endDraw();
  
}

void draw(){
  //fill(125, 50);
  //rect(0, 0, width, height);
  //image(pg, 0, 0, width, height);
  
  drawGrid();
  
  for(int x = 0; x < width/step; x += 2){
    for(int y = 0; y < height/step; y += 2){
      float pixelX = map(dots[x][y].x, 0, width, 0, 360);
      float pixelY = map(dots[x][y].y, 0, height, 0, 360);
      fill(pg.get(int(pixelX), int(pixelY)));
      circle(dots[x][y].x, dots[x][y].y, radius);
    }
  }
  
  if(currentStep >= step){
    bMovedown = !bMovedown;
    currentStep = 0;
  }
  
  if(bMovedown){
    moveDown();
  }
  else {
    moveRight();
  }
  currentStep += increment;
  
}

void drawGrid(){
  for(int x = 0; x <= width; x += step){
    line(x, 0, x, height); 
  }
  for(int y = 0; y <= height; y += step){
    line(0, y, width, y); 
  }
}

void moveDown(){
  for(int x = 0; x < width/step; x += 2){
    for(int y = 0; y < height/step; y += 2){
      dots[x][y].add(0, increment);
    }
  }
}

void moveRight(){
  for(int x = 0; x < width/step; x += 2){
    for(int y = 0; y < height/step; y += 2){
      dots[x][y].add(increment, 0);
    }
  }
}
