class Planet {
  float radius;
  float angle;
  float distance;
  float orbitSpeed;
  Planet[] planets;
  
  color col = color(random(255), random(255), random(255));

  Planet(float _r, float _d) {
    radius = _r;
    angle = random(TWO_PI);
    distance = _d;
    orbitSpeed = (distance != 0) ? 2/distance : 0;
    
    println(orbitSpeed);
  }

  void show() {
    pushMatrix();
    rotate(angle);  
    translate(distance, 0);
    fill(col);
    ellipse(0, 0, radius*2, radius*2);
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
      planets[i] = new Planet(radius * 0.3, random(radius * 3, radius * 10) * (i+1)/level);
      if(random(1.0) < 0.5 && level < 3){
        planets[i].spawnMoons(int(random(1, 4)), level++);
      }
    }
  }
}
