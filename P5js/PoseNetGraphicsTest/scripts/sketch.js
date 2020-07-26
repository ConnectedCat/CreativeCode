let video;

let poseNet;
let poses = [];
let player;
let datapoints = [];

let ready = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = new Body();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, {minConfidence: 0.8, maxPoseDetections: 1,});
    poseNet.on('pose', (_poses) => {
        ready = player.update(_poses[0]);
    });
}

function draw() {
    background(255);
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, width * video.height/video.width);
    
    if(ready){
        player.show();
        player.catchData();

        if(random() < 0.01) datapoints.push(new Datapoint(createVector(random(player.leftShoulder.x, player.rightShoulder.x), random(player.leftShoulder.y, player.leftHip.y))));
    }

    datapoints.forEach(datapoint => {
        datapoint.update();
        datapoint.show();
    })
}

// HELPER STUFF:

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}