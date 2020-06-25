float sizeCoeff1, sizeCoeff2, sizeCoeffCurrent, lerpAmount, noiseX;
color rectColor1, rectColor2, rectColorCurrent;

int strokeWeight = 7;
int timerNow, timerPrev;
int recalcInterval = 5000;

void setup(){
  size(800, 800);
  
  frameRate(1);
  
  colorMode(RGB, 255, 255, 255, 100);
  rectColor2 = color(123, 89, 186);
  sizeCoeff2 = random(50, width/3);
  noiseX = 0;
  
  recalcTargets();
}

void draw(){
  fill(200, 200, 200, 3);
  noStroke();
  rect(0, 0, width, height);
  
  lerpAmount = map(timerNow, 0, recalcInterval, 0, 1);
  rectColorCurrent = lerpColor(rectColor1, rectColor2, lerpAmount);
  sizeCoeffCurrent = lerp(sizeCoeff1, sizeCoeff2, lerpAmount);
  
  drawRect1(sizeCoeffCurrent, rectColorCurrent, strokeWeight );
  drawRect2(sizeCoeffCurrent, rectColorCurrent, strokeWeight );
  
  if( triggerRecalc()){
    recalcTargets();
  }
}

boolean triggerRecalc(){
  timerNow = millis()%recalcInterval;
  if(timerNow < timerPrev){
    return true;
  }
  else {
    timerPrev = timerNow;
    return false;
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
  timerNow = 0;
  timerPrev = 0;
  noiseX += 1;
  rectColor1 = rectColor2;
  sizeCoeff1 = sizeCoeff2;
  
  rectColor2 = color(random(100, 255), random(100, 255), random(100, 255));
  //sizeCoeff2 = random(50, width/3);
  sizeCoeff2 = map(noise(noiseX), 0, 1, 0, width/2);
  println(sizeCoeff2);
  
}
