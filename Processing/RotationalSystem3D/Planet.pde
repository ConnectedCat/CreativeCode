class Planet {
  float radius;
  float angle;
  float distance;
  float orbitSpeed;
  Planet[] planets;

  PVector v; //vector from parent
  PVector v2; //random vector to cross with for a perpendicular vector
  PVector p; //perpendicular vector around which the sphere rotates

  color col = color(random(255), random(255), random(255));

  Planet(float _r, float _d) {
    radius = _r;
    angle = random(TWO_PI);
    distance = _d;
    orbitSpeed = (distance != 0) ? 2/distance : 0;
    
    //v = new PVector(1, 0, 0);
    //v2 = new PVector(0, 0.5, 1);
    
    v = new PVector(vX, vY, vZ);
    v2 = new PVector(v2X, v2Y, v2Z);
    v.mult(distance);
    p = v.cross(v2);
  }

  void show() {
    updateVectors();
    
    pushMatrix();
    rotate(angle, p.x, p.y, p.z);
    showDirectionals();
    
    translate(v.x, v.y, v.z);
    fill(col);
    sphere(radius);
    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        showOrbit(planets[i].col, planets[i].distance);
        planets[i].show();
      }
    }

    popMatrix();
  }
  
  void showOrbit(color c, float d){
    pushMatrix();
    rotate(QUARTER_PI, 1, 1, 1);
    stroke(c);
    noFill();
    ellipse(0, 0, d*2, d*2 );
    
    for(int i = -width/6; i < width/6; i+=20){
      line(i, -height/6, i, height/6);  
    }
    for(int j = -height/6; j < height/6; j+=20){
      line(-width/6, j, width/6, j);
    }
    noStroke();
    popMatrix();
  }
  
  void showDirectionals(){
    stroke(255, 0, 200);
    line(0, 0, 0, v.x, v.y, v.z);
    stroke(255, 0, 0);
    v2.mult(40);
    line(0, 0, 0, v2.x, v2.y, v2.z);
    noStroke();
  }
  
  void updateVectors(){
    v.set(vX, vY, vZ);
    v2.set(v2X, v2Y, v2Z);
    v.mult(distance);
    p = v.cross(v2);
  }
  
  void orbit() {
    angle = angle + orbitSpeed;
    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        planets[i].orbit();
      }
    }
  }

  void spawnMoons(int numPlan, int level) {
    planets = new Planet[numPlan];

    for (int i = 0; i< planets.length; i++) {
      planets[i] = new Planet(radius * 0.3, random(radius * 3, radius * 7) * (i+1)/level);
      if (random(1.0) < 0.5 && level < 1) {
        planets[i].spawnMoons(int(random(1, 5)), level+1);
      }
    }
  }
}
