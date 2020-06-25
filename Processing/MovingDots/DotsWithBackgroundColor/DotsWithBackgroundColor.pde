PVector[][] dots1, dots2;
float radius = 190;
int step = 100;
float currentStep = 0;
float increment = 1.0;
boolean bMovedown = true;

color pixelColor;
PGraphics pg;

void setup(){
  size(1000, 1000);
  
  pg = createGraphics(360, 360);
  
  pg.beginDraw();
  pg.colorMode(HSB);
  pg.endDraw();
  
  pg.beginDraw();
  for(int x = 0; x < width; x++){
    for(int y = 0; y < height; y ++){
      
      pixelColor = color(x, y, 100);
      pg.stroke(pixelColor);
      pg.point(x, y);
      
    }
  }
  
  pg.endDraw();
  
  dots1 = new PVector[width/step + 2][height/step + 2];
  dots2 = new PVector[width/step + 2][height/step + 2];
  
  for(int x = 0; x < width/step + 2; x += 2){
    for(int y = 0; y < height/step + 2; y += 2){
      dots1[x][y] = new PVector(step*x - step - step/2, step*y - step - step/2);
    }
  }
  
  for(int x = 0; x < width/step + 2; x += 2){
    for(int y = 0; y < height/step + 2; y += 2){
      dots2[x][y] = new PVector(step*x - step/2, step*y - step/2);
    }
  }
  
}

void draw(){
  background(125);
  
  //image(pg, 0, 0, width, height);
  //increment = noise(0.2, 0.02);
  //drawGrid();
  
  for(int x = 0; x < width/step + 2; x += 2){
    for(int y = 0; y < height/step + 2; y += 2){
      float pixelX = map(dots1[x][y].x, 0-radius/2, width+radius/2, 0, 360);
      float pixelY = map(dots1[x][y].y, 0-radius/2, height+radius/2, 0, 360);
      fill(pg.get(int(pixelX), int(pixelY)));
      circle(dots1[x][y].x, dots1[x][y].y, radius);
      
      pixelX = map(dots2[x][y].x, 0-radius/2, width+radius/2, 0, 360);
      pixelY = map(dots2[x][y].y, 0-radius/2, height+radius/2, 0, 360);
      fill(pg.get(int(pixelX), int(pixelY)));
      circle(dots2[x][y].x, dots2[x][y].y, radius);
    }
  }
  
  //fill(pg.get(mouseX, mouseY));
  //rect(mouseX, mouseY, 100, 100);
  
  
  if(currentStep >= step){
    bMovedown = !bMovedown;
    currentStep = 0;
  }
  
  if(bMovedown){
    moveUp();
    moveDown();
  }
  else {
    moveLeft();
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

void moveUp(){
  for(int x = 0; x < width/step + 2; x += 2){
    for(int y = 0; y < height/step + 2; y += 2){
      dots2[x][y].sub(0, increment);
      
      if(dots2[x][y].y <= - step - step/2){
        dots2[x][y].y = height + step/2;
      }
    }
  }
  
}

void moveDown(){
  for(int x = 0; x < width/step + 2; x += 2){
    for(int y = 0; y < height/step + 2; y += 2){
      dots1[x][y].add(0, increment);
      
      if(dots1[x][y].y >= height+step/2){
        dots1[x][y].y = - step - step/2;
      }
    }
  }
}

void moveLeft(){
  for(int x = 0; x < width/step + 2; x += 2){
    for(int y = 0; y < height/step + 2; y += 2){
      dots2[x][y].sub(increment, 0);
      
      if(dots2[x][y].x <= - step - step/2){
        dots2[x][y].x = width + step/2;
      }
    }
  }
}

void moveRight(){
  for(int x = 0; x < width/step + 2; x += 2){
    for(int y = 0; y < height/step + 2; y += 2){
      dots1[x][y].add(increment, 0);
      
      if(dots1[x][y].x >= width+step/2){
        dots1[x][y].x = - step - step/2;
      }
    }
  }
}

void mousePressed(){
  noLoop();
}

void mouseReleased(){
  loop();
}
