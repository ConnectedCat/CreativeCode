let snake, food;
let gridScl = 20;

let cols, rows;

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB, 360, 100, 100, 100);

    cols = width/gridScl;
    rows = height/gridScl;

    snake = new Snake();
    food = new Food();
    frameRate(5);

    noStroke();
}

function draw() {
    background(100, 0, 0);

    if(snake.eat(food)){
        food.drop();
    }

    snake.update();
    snake.show();

    food.show();

    drawGrid();
}

function keyPressed(){
    switch(keyCode){
        case UP_ARROW:
            snake.dir(0, -1);
            break;
        case DOWN_ARROW:
            snake.dir(0, 1);
            break;
        case LEFT_ARROW:
            snake.dir(-1, 0);
            break;
        case RIGHT_ARROW:
            snake.dir(1, 0);
            break;
        default:
            break; 
    }
}

// GRID helpers:
function drawGrid(){
    stroke(0, 100, 100);
    for(let i = 0; i < cols; i++){
        line(i*gridScl, 0, i*gridScl, height);
    }

    for(let i = 0; i < rows; i++){
        line(0, i*gridScl, width, i*gridScl);
    }
}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}