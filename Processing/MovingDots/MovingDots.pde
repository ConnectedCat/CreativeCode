PVector[][] dots1, dots2;
float radius = 90;
int step = 100;
float currentStep = 0;
float increment = 1.0;
boolean bMovedown = true;

void setup(){
  size(1000, 1000);
  
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
  //increment = noise(0.2, 0.02);
  drawGrid();
  
  for(int x = 0; x < width/step + 2; x += 2){
    for(int y = 0; y < height/step + 2; y += 2){
      fill(map(x, 0, width/step +2, 0, 255 ), map(y, 0, height/step + 2, 0, 255), map(y, height/step + 2, 0, 0, 255));
      circle(dots1[x][y].x, dots1[x][y].y, radius);
      fill(0, 155, 155);
      circle(dots2[x][y].x, dots2[x][y].y, radius);
    }
  }
  
  
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
