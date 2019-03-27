float xStep = 10;
int margin = 20;

float lastX, lastY, yNoise, xNoise = 0;
float centerY;

void setup(){
  size(600, 800);
}


void draw(){
  background(255);
  xNoise = 0;
  
  stroke(204, 104, 0);
  centerY = 50;
  for(int x = margin; x <= width - margin; x += xStep){
    float y = map(noise(xNoise, yNoise), 0, 1, centerY - 50, centerY + 50);
    if(lastX != width - margin){
      line(x, y, lastX, lastY);
    }
    lastX = x;
    lastY = y;
    if(x < width /2){
      xNoise += 0.05;
      yNoise +=0.01;
    }
    else {
      xNoise -= 0.05;
      yNoise -=0.01;
    }
  }
  
  stroke(0);
  line(margin, centerY+50, width-margin, centerY+50);
  
  stroke(204, 104, 0);
  centerY += 100;
  for(int x = margin; x <= width - margin; x += xStep){
    float y = map(noise(xNoise, yNoise), 0, 1, centerY - 50, centerY + 50);
    if(lastX != width - margin){
      line(x, y, lastX, lastY);
    }
    lastX = x;
    lastY = y;
    xNoise += 0.05;
    if(x < width /2){
      yNoise +=0.01;
    }
    else {
      yNoise -=0.01;
    }
  }
  
  stroke(0);
  line(margin, centerY+50, width-margin, centerY+50);
  
  stroke(204, 104, 0);
  
  centerY += 100;
  float lerpAmnt = 1;
  float increment = 1/((width/2 - margin)/xStep);
  
  for(int x = margin; x <= width - margin; x += xStep){
    
    
    float val = lerp(noise(xNoise, yNoise), 0.5, lerpAmnt);
    float y = map(val, 0, 1, centerY - 50, centerY + 50);
    
    if(lastX != width - margin){
      line(x, y, lastX, lastY);
    }
    lastX = x;
    lastY = y;
    xNoise += 0.05;
    

    if(x < width/2){
      lerpAmnt -= increment;
    }
    else {
      lerpAmnt += increment;
    }
  }
  
  stroke(0);
  line(margin, centerY+50, width-margin, centerY+50);
  
  stroke(204, 104, 0);
  
  centerY += 100;
  
  for(int x = margin; x <= width - margin; x += xStep){
    float val = lerp(noise(yNoise), 0.5, lerpAmnt);
    float y = map(val, 0, 1, centerY - 50, centerY + 50);
    
    if(lastX != width - margin){
      line(x, y, lastX, lastY);
    }
    lastX = x;
    lastY = y;
    xNoise += 0.05;
    

    if(x < width/2){
      lerpAmnt -= increment;
    }
    else {
      lerpAmnt += increment;
    }
  }
  
  stroke(0);
  line(margin, centerY+50, width-margin, centerY+50);
  
  stroke(204, 104, 0);
  
  centerY += 100;
  for(int x = margin; x <= width - margin; x += xStep){
    float y = map(noise(xNoise, yNoise), 0, 1, centerY - 50, centerY + 50);
    if(lastX != width - margin){
      line(x, y, lastX, lastY);
    }
    lastX = x;
    lastY = y;
    xNoise += 0.05;
  }
  
  yNoise -=0.01;
  
}

float customRandom(float centerPoint, float radians){
  //return centerPoint + (pow(sin(radians), 3) * 40 * noise(radians*2));
  return map(noise(radians), 0, 1, centerPoint - 50, centerPoint + 50);
  
}
