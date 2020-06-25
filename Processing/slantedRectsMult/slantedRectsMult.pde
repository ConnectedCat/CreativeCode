float sizeCoeff1, sizeCoeff2, sizeCoeff3, sizeCoeff4, sizeCoeffCurrent1, sizeCoeffCurrent2, lerpAmount, noiseX, noiseY;
color rectColor1, rectColor2, rectColorCurrent1, rectColor3, rectColor4, rectColorCurrent2;

int strokeWeight = 7;
int timerRecalcNow, timerRecalcPrev, timerDrawNow, timerDrawPrev;
int recalcInterval = 5000;
int drawInterval = 1000;

void setup(){
  size(800, 800);
  
  //frameRate(5);
  noiseX = 0;
  noiseY = 0;
  noiseDetail(3,0.1);
  
  colorMode(HSB, 360, 100, 100, 100);
  rectColor2 = generateRandomColor();
  rectColor4 = generateRandomColor();
  //sizeCoeff2 = random(50, width/3);
  sizeCoeff2 = map(noise(noiseX, 0), 0, 1, 0, width);
  sizeCoeff4 = map(noise(0, noiseY), 0, 1, 0, height);
  recalcTargets();
  
  background(0);
}

void draw(){
  fill(0, 0, 0, 1);
  noStroke();
  rect(0, 0, width, height);
  
  lerpAmount = map(timerRecalcNow, 0, recalcInterval, 0, 1);
  rectColorCurrent1 = lerpColor(rectColor1, rectColor2, lerpAmount);
  sizeCoeffCurrent1 = lerp(sizeCoeff1, sizeCoeff2, lerpAmount);
  
  lerpAmount = map(timerRecalcNow, 0, recalcInterval, 0, 1);
  rectColorCurrent2 = lerpColor(rectColor3, rectColor4, lerpAmount);
  sizeCoeffCurrent2 = lerp(sizeCoeff3, sizeCoeff4, lerpAmount);
  
  
  if( triggerDraw() ){
    timerDrawNow = timerDrawPrev = 0;
    drawRect1(sizeCoeffCurrent1, rectColorCurrent1, strokeWeight );
    drawRect2(sizeCoeffCurrent2, rectColorCurrent2, strokeWeight );
  }
  
  if( triggerRecalc()){
    recalcTargets();
  }
}

void drawRect1(float sizeCoeff, color rectColor, int weight){
  noFill();
  stroke(rectColor);
  strokeWeight(weight);
  line(sizeCoeff, 0, width, height-sizeCoeff);
  line(width, height-sizeCoeff, width-sizeCoeff, height);
  line(width-sizeCoeff, height, 0, sizeCoeff);
  line(0, sizeCoeff, sizeCoeff, 0); 
}

void drawRect2(float sizeCoeff, color rectColor, int weight){
  noFill();
  stroke(rectColor);
  strokeWeight(weight);
  line(width-sizeCoeff, 0, width, sizeCoeff);
  line(width, sizeCoeff, sizeCoeff, height);
  line(sizeCoeff, height, 0, height-sizeCoeff);
  line(0, height-sizeCoeff, width-sizeCoeff, 0); 
}

void recalcTargets(){
  timerRecalcNow = 0;
  timerRecalcPrev = 0;
  noiseX += 0.5;
  noiseY += 0.5;
  rectColor1 = rectColor2;
  sizeCoeff1 = sizeCoeff2;
  rectColor3 = rectColor4;
  sizeCoeff3 = sizeCoeff4;
  
  rectColor2 = generateRandomColor();
  rectColor4 = generateRandomColor();
  //sizeCoeff2 = random(50, width/3);
  sizeCoeff2 = map(noise(noiseX, 0), 0, 1, 0, width/2);
  sizeCoeff4 = map(noise(0, noiseY), 0, 1, 0, width/2);
  
}

boolean triggerRecalc(){
  timerRecalcNow = millis()%recalcInterval;
  if(timerRecalcNow < timerRecalcPrev){
    return true;
  }
  else {
    timerRecalcPrev = timerRecalcNow;
    return false;
  }
}

boolean triggerDraw(){
  timerDrawNow = millis()%drawInterval;
  if(timerDrawNow < timerDrawPrev){
    return true;
  }
  else {
    timerDrawPrev = timerDrawNow;
    return false;
  }
}

color generateRandomColor(){
  return color(random(360), random(50, 100), random(50, 100));
}
