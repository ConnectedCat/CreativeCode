PVector centerPoint;
color centerColor = color(255);
float pointRadius = 5;

float mainRadius;
color mainRadiusColor = color(0);

PVector zeroAngle;
color zeroAngleColor = color(0);

//in degrees, not radians
float mainTheta = -45;
PVector radiusPoint;

color radiusPointColor = color(255, 0, 0);
//main trianlge colors
color adjacentColor = color(0, 255, 0);
color oppositeColor = color(0, 0, 255);
color hypotenuseColor = color(255, 0, 0);
//additional colors
color versineColor = color(255, 0, 255);
color secantColor = color(255, 255, 0);
color tangentColor = color(255,140,0);
color cordColor = color(255);

float infoFieldHeight = 100;
color textColor = color(0);

//interactions
boolean draggable = false;

void setup(){
  size(800, 800);
  
  centerPoint = new PVector(width/2, height/2-infoFieldHeight/2);
  mainRadius = width/4;
  
  zeroAngle = new PVector(centerPoint.x + cos(0)*(mainRadius), centerPoint.y + sin(0)*(mainRadius));
  
  //radiusPoint = new PVector(centerPoint.x + cos(radians(mainTheta))*mainRadius, centerPoint.y+sin(radians(mainTheta))*mainRadius);
  //or
  radiusPoint = PVector.fromAngle(radians(mainTheta));
  radiusPoint.setMag(mainRadius);
  radiusPoint.add(centerPoint);
  
  textSize(16);
}

void draw(){
  background(200);
  drawGrid(width/16, color(150));
  
  //draw the main circle
  noFill();
  stroke(mainRadiusColor);
  circle(centerPoint.x, centerPoint.y, mainRadius*2);
  
  //line(centerPoint.x, centerPoint.y, zeroAngle.x, zeroAngle.y);
  
  
  
  //draw main triangle
  //adjacent:
  stroke(adjacentColor);
  line(centerPoint.x, centerPoint.y, radiusPoint.x, centerPoint.y);
  //opposite:
  stroke(oppositeColor);
  line(radiusPoint.x, centerPoint.y, radiusPoint.x, radiusPoint.y);
  //hypotenuse:
  stroke(hypotenuseColor);
  line(radiusPoint.x, radiusPoint.y, centerPoint.x, centerPoint.y);
  
  
  //tangent
  float tangent1Angle = 180-(90+mainTheta);
  PVector tangent1Vector = PVector.fromAngle(radians(-tangent1Angle));
  tangent1Vector.setMag( tan(radians(mainTheta))*mainRadius );
  tangent1Vector.add(radiusPoint);
  
  PVector tangent2Vector = PVector.fromAngle(HALF_PI);
  tangent2Vector.setMag( tan(radians(mainTheta))*mainRadius );
  tangent2Vector.add(zeroAngle);
  
  stroke(tangentColor);
  line(radiusPoint.x, radiusPoint.y, tangent1Vector.x, tangent1Vector.y);
  line(zeroAngle.x, zeroAngle.y, tangent2Vector.x, tangent2Vector.y);
  
  
  //cord (icoseles triangle base)
  float cordAngle = 180 - (180-mainTheta)/2 - mainTheta;
  PVector cordVector = PVector.fromAngle(radians(-cordAngle));
  cordVector.setMag(2*mainRadius*sin(radians(mainTheta/2)));
  cordVector.add(radiusPoint);
  
  float altAngle = mainTheta/2;
  PVector altVector = PVector.fromAngle(radians(altAngle));
  altVector.setMag(mainRadius*cos(radians(altAngle)));
  altVector.add(centerPoint);
  
  stroke(cordColor);
  line(radiusPoint.x, radiusPoint.y, cordVector.x, cordVector.y);
  line(centerPoint.x, centerPoint.y, altVector.x, altVector.y);
  
  
    
  //draw secondary lines
  stroke(versineColor);
  line(radiusPoint.x, centerPoint.y-1, zeroAngle.x, zeroAngle.y-1);
  stroke(secantColor);
  line(centerPoint.x, centerPoint.y+1, tangent1Vector.x, tangent1Vector.y+1); 
  
  //draw the center point
  noStroke();
  fill(centerColor);
  circle(centerPoint.x, centerPoint.y, pointRadius*2);
  
  //the zero angle point
  fill(zeroAngleColor);
  text("0 deg/rad", zeroAngle.x+10, zeroAngle.y-10);
  circle(zeroAngle.x, zeroAngle.y, pointRadius*2);
  
  //the radius at theta point
  text("("+radiusPoint.x+", "+radiusPoint.y+")",radiusPoint.x+10, radiusPoint.y-10);
  fill(radiusPointColor);
  circle(radiusPoint.x, radiusPoint.y, pointRadius*2);
  
  //the secant point
  fill(tangentColor);
  circle(tangent1Vector.x, tangent1Vector.y, pointRadius*2);
  
  //info field:
  fill(125);
  rect(0, height-infoFieldHeight, width, height);
  
  fill(textColor);
  text("Theta angle: " + mainTheta + " degrees", 20, height-infoFieldHeight+20);
  text(radians(mainTheta) + " radians", 120, height-infoFieldHeight+50);
  
  text("Versine: " + (1-cos(radians(mainTheta)))*mainRadius, 20, height-infoFieldHeight+80 );
  text("Secant: " + 1/cos(radians(mainTheta))*mainRadius, width/2, height-infoFieldHeight+20);
}

// CUSTOM FUNCTIONS
void drawGrid(int cellSize, color gridColor){
  stroke(gridColor);
  for(int x = 0; x < width/cellSize; x++){
    line(x*cellSize, 0, x*cellSize, height);
  }
  
  for(int y = 0; y < height/cellSize; y++){
    line(0, y*cellSize, width, y*cellSize);
  }
}

// INTERACTIONS

void mousePressed(){
  if(dist(mouseX, mouseY, radiusPoint.x, radiusPoint.y ) <= pointRadius*3){
    draggable = true;
  }
}

void mouseDragged(){
  if(draggable){
    PVector mouse = new PVector(mouseX, mouseY);
    //radiusPoint = PVector.sub(mouse, centerPoint);
    radiusPoint = mouse.sub(centerPoint);
    radiusPoint.setMag(mainRadius);
    radiusPoint.add(centerPoint);
    
    float adjLength = dist(centerPoint.x, centerPoint.y, radiusPoint.x, centerPoint.y);
    
    if(mouseX <= centerPoint.x) adjLength = -adjLength;
    mainTheta = degrees(acos(adjLength/mainRadius));
    if(mouseY <= centerPoint.y) mainTheta = -mainTheta;
  }
}

void mouseReleased(){
  draggable = false;
}
