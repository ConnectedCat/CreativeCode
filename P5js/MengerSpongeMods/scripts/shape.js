class Shape{
    constructor(_x, _y, _z, _size){
        this.pos = createVector(_x, _y, _z);
        this.size = _size;

        let colorG = map(this.pos.x, -colorScale/2, colorScale/2, 0, 255);
        let colorB = map(this.pos.y, -colorScale/2, colorScale/2, 0, 255);
        let colorR = map(this.pos.z, -colorScale/2, colorScale/2, 0, 255);

        this.color = color( colorR, colorG, colorB );
    }

    generate(){
        let nextShapes = new Array();
        let newSize = this.size/3;

        for(let i = -1; i < 2; i++){
            for(let j = -1; j < 2; j++){
                for(let k = -1; k < 2; k++){
                    if((abs(i)+abs(j)+abs(k)) > 1 ){
                        nextShapes.push(new Shape(this.pos.x+i*newSize, this.pos.y+j*newSize, this.pos.z+k*newSize, newSize));
                    }
                }
            }
        }

        return nextShapes;
    }

    draw(){
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        noStroke();
        fill(this.color);
        box(this.size);
        pop();
    }
}