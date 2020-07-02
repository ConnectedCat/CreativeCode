class Snake{
    constructor(){
        this.speed = createVector(int(random(-1, 1)), int(random(-1, 1)))
        this.tail = [createVector(floor(random(cols))*gridScl, floor(random(rows))*gridScl)];
        this.tailColors = [color(90, 100, 100)];
    }

    update(){
        let newTail = this.tail.slice();
        let newHead = newTail[0].copy();
        
        newHead.add(this.speed.x *gridScl, this.speed.y * gridScl);
        
        newHead.x = constrain(newHead.x, 0, width-gridScl);
        newHead.y = constrain(newHead.y, 0, height-gridScl);

        if(newTail.length > 1){
            newTail.pop();
            newTail.unshift(newHead);
        }
        else {
            newTail[0] = newHead;
        }
        this.tail = newTail;
    }

    show(){
        
        this.tail.forEach((element, i) => {
            fill(this.tailColors[i]);
            rect(element.x, element.y, gridScl, gridScl);
        })
    }

    dir(_x, _y){
        this.speed.set(_x, _y);
    }

    eat(food){
        if(this.tail[0].dist(food.pos) <= gridScl){
            this.tail.unshift(food.pos);
            this.tailColors.unshift(food.colr);
            return true;
        }
        else {
            return false;
        }
    }
}