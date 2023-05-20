//String text1 = "THE TIME\nIS\nNOW";
//String text2 = "HEAR\nTHE\nUNHEARD";
String text1 = "WHO YOU\nGONNA\nCALL";
String text2 = "WHEN\nTHE COPS\nARE\nTHE KILLERS";
//String text1 = "STOP\nKILLING\nUS";
//String text2 = "WHO\nWILL BE\nNEXT";
//String text2 = "BLACK\nLIVES\nMATTER";

PGraphics text1Layer, text2Layer;

int fontSize = 140;
int leading = 140;

color textLayerColor = color(255);
color bloodColor = color(240);
color bckgColor = color(230, 20, 40);

float posX, posY, probCoeff, counter, pauseCounter, counterCos;
float pauseTimer = 7000; // 5 sec

float posRandomizer = fontSize/15;
float offChance = 0.0;
float easingSlope = 0.03;

PFont font;

void setup() {
  size(800, 800, P3D);
  //fullScreen();
  font = loadFont("Text-80.vlw");
  
  text1Layer = createGraphics(width, height);
  text1Layer.beginDraw();
  text1Layer.textFont(font, fontSize);
  text1Layer.textLeading(leading);
  text1Layer.textAlign(CENTER, CENTER);
  text1Layer.fill(textLayerColor);
  text1Layer.text(text1, width/2, height/2-20);
  text1Layer.endDraw();

  text2Layer = createGraphics(width, height);
  text2Layer.beginDraw();
  text2Layer.textFont(font, fontSize);
  text2Layer.textLeading(leading);
  text2Layer.textAlign(CENTER, CENTER);
  text2Layer.fill(textLayerColor);
  text2Layer.text(text2, width/2, height/2-20);
  text2Layer.endDraw();

  posX = width/2;
  posY = height/2;
  counter = 0;
  pauseCounter = 0;
  
  noStroke();
  rectMode(CENTER);
  fill(bloodColor);
}

void draw() {
  background(bckgColor);

  probCoeff = abs(counter);
  counterCos = cos(counter);
  posY = map(counterCos, -1, 1, height/4, height*0.75);

  if (abs(counterCos) > 0.99) {
    float currentRemainder = millis() % pauseTimer;
    if (pauseCounter > currentRemainder) {
      counter += easingSlope*2;
    } else {
      pauseCounter = currentRemainder;
    }
  } else {
    //run sine counter
    counter += easingSlope;
    pauseCounter = 0;
  }

  
  for (int x = 0; x < width; x++ ) {
    for (int y = 0; y < height; y++) {
      if (counterCos > random(-1, 1)) {
        if (text1Layer.get(x, y) == textLayerColor || (random(1) < offChance)) {
          rect(random(x-posRandomizer, x+posRandomizer), random(y-posRandomizer, y+posRandomizer), random(4, 11), random(4, 10));
        }
      } 
      else {
        if (text2Layer.get(x, y) == textLayerColor || (random(1) < offChance)) {
          rect(random(x-posRandomizer, x+posRandomizer), random(y-posRandomizer, y+posRandomizer), random(4, 11), random(4, 10));
        }
      }
    }
  }
}
