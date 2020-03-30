ArrayList<Blb> blobs;

void setup(){
  size(800, 800);
  
  blobs = new ArrayList<Blb>();

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
