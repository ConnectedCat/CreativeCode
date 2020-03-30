ArrayList<Blb> blobs;

void setup(){
  size(800, 800);
  
  blobs = new ArrayList<Blb>();
  
  blobs.add( new Blb(width/2, height/2, width/4) );
}

void draw(){
  background(0);
  
  for(Blb blob : blobs){
    blob.display();
  }
}

void mouseReleased(){
  blobs.add( new Blb(mouseX, mouseY, random(width/4)) );
}
