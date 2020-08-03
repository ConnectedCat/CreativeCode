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
    v = new PVector(1, 0, 0);
    v.mult(distance);
    v2 = new PVector(0, 0.5, 1);
    p = v.cross(v2);
  }

  void show() {
    pushMatrix();
    rotate(angle, p.x, p.y, p.z);
    //stroke(col);
    //line(0, 0, 0, v.x, v.y, v.z);
    //noStroke();
    translate(v.x, v.y, v.z);
    
    fill(col);
    sphere(radius);
    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        planets[i].show();
      }
    }
    
    popMatrix();
  }
  
  void orbit(){
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
      if(random(1.0) < 0.5 && level < 2){
        planets[i].spawnMoons(int(random(1, 5)), level+1);
      }
    }
  }
}
