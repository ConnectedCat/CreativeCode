 PGraphics pg;
ArrayList<Circle> circles;
ArrayList<PVector> spots;

PFont font;
int fontSize = 250;

void setup() {
  font = createFont("Arial", fontSize);
  size(500, 500);
  spots = new ArrayList<PVector>();
  pg = createGraphics(width, height);
  pg.smooth();
  pg.beginDraw();
  pg.fill(0, 0, 255);
  pg.textFont(font);
  pg.textSize(fontSize);
  pg.textLeading(200);
  pg.pushMatrix();
  pg.translate(width/2, height/2-30);
  pg.textAlign(CENTER, CENTER);
  pg.text("20\n21", 0, 0);
  pg.popMatrix();
  pg.endDraw();
  
  pg.loadPixels();
  for (int x = 0; x < pg.width; x++) {
    for (int y = 0; y < pg.height; y++) {
      int index = x + y * pg.width;
      color c = pg.pixels[index];
      float b = brightness(c);
      if (b > 1) {
        spots.add(new PVector(x,y));
      }
      
    } 
  }
  circles = new ArrayList<Circle>();
}

void draw() {
  background(0);

  int total = 10;
  int count = 0;
  int attempts = 0;

  while (count <  total) {
    Circle newC = newCircle();
    if (newC != null) {
      circles.add(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      println("FINISHED");
      break;
    } 
  }


  for (Circle c : circles) {
    if (c.growing) {
      if (c.edges()) {
        c.growing = false;
      } else {
        for (Circle other : circles) {
          if (c != other) {
            float d = dist(c.x, c.y, other.x, other.y);
            if (d - 2 < c.r + other.r) {
              c.growing = false;
              break;
            }
          }
        }
      }
    }
    c.show();
    c.grow();
  }
  println(frameRate);
  saveFrame("output/line-######.png");
}

Circle newCircle() {
  
  int r = int(random(0,spots.size()));
  PVector spot = spots.get(r);
  float x = spot.x;
  float y = spot.y;

  boolean valid = true;
  for (Circle c : circles) {
    float d = dist(x, y, c.x, c.y);
    if (d < c.r) {
      valid = false;
      break;
    }
  }

  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}
