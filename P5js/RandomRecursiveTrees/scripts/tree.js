class Tree {
    constructor(_position) {
      this.color = color(0, 100, 30);
      this.age = 3; //determines the number of branching levels, their length and thickness
      this.position = _position;
  
      //array of branches
      this.branches = [this.branch(200)];
      //console.log(this.branches);
    }
  
    branch(h) {
      h *= 0.6;
  
      if (h > 10) {
        let numBranches = int(random(5, 9));
        let len = h * random(0.6, 1.8);
        
        //the angle needs to factor in the h number
        let ang = random(PI / (h/2), PI / (h/6));
        
        if(random() < 0.5){
          ang*= -1;
        }
        //console.log(ang)
        
        let brans = [];
        for (let i = 0; i < numBranches; i++) {
          brans.push(this.branch(h));
        }
  
        return {
          length: len,
          angle: ang,
          branches: brans,
        };
      } 
      else {
        return null;
      }
    }
  
    displayTree() {
      push();
      translate(this.position);
      this.branches.forEach((branch) => {
        this.displayBranch(branch);
      });
      pop();
    }
  
    displayBranch(branch) {
      push();
      rotate(branch.angle);
      strokeWeight(branch.length*0.05);
      stroke(color(100-branch.length, 100, 105-branch.length));
      line(0, 0, 0, branch.length * -1);
      translate(0, branch.length * -1);
      if (branch.branches[0] != null) {
        branch.branches.forEach((branch) => {
          this.displayBranch(branch);
        });
      }
      pop();
    }
}
  