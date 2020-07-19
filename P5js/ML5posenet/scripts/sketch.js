let video;
let poseNet;

let poses = new Array();

let poseColors = new Array();
let medianHue;

var currentFrameRate;

let printPose = true;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide()
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);

  colorMode(HSB);
  medianHue = 30;

  console.log("setup ran");
}

function draw() {
  // currentFrameRate = frameRate();
  // if (currentFrameRate < 25) console.log(currentFrameRate);

  //image(video, 0, 0);
  background(255);

  if (poses.length > 0) {
    // poses.forEach(function(poseObj, colorIndex){
    //   drawPose(poseObj, colorIndex);
    // });

    drawBody(poses[0], 0)
    drawPose(poses[0], 0);
  }

}

function drawPose(poseObj, colorIndex) {
  let pose = poseObj.pose;
  let skeleton = poseObj.skeleton;
  if(printPose && skeleton.length > 0){
    console.log(poseObj);
    printPose = false;
  }
  

  for (let i = 0; i < pose.keypoints.length; i++) {
    let x = pose.keypoints[i].position.x;
    let y = pose.keypoints[i].position.y;
    noStroke();
    fill(poseColors[colorIndex][i]);
    ellipse(x, y, 16, 16);
  }

  for (let i = 0; i < skeleton.length; i++) {
    let a = skeleton[i][0];
    let b = skeleton[i][1];
    strokeWeight(2);
    stroke(poseColors[colorIndex][i]);
    line(a.position.x, a.position.y, b.position.x, b.position.y);
  }
}

// only one of the options

function drawBody(poseObj, colorIndex){
  let head = {'nose': poseObj.pose.nose,
              'leftEye': poseObj.pose.leftEye,
              'rightEye': poseObj.pose.rightEye}
  
  let centroidX = (head.nose.x + head.leftEye.x + head.rightEye.x)/3;
  let centroidY = (head.nose.y + head.leftEye.y + head.rightEye.y)/3;
  let diam = dist(centroidX, centroidY, head.leftEye.x, head.leftEye.y) * 4;
  
  fill(0);
  ellipse(centroidX, centroidY, diam, diam);

  beginShape();
  vertex(poseObj.pose.leftShoulder.x, poseObj.pose.leftShoulder.y);
  vertex(poseObj.pose.rightShoulder.x, poseObj.pose.rightShoulder.y);
  vertex(poseObj.pose.rightHip.x, poseObj.pose.rightHip.y);
  vertex(poseObj.pose.leftHip.x, poseObj.pose.leftHip.y);
  endShape();

}

function detectClap(pose){
  let d = dist(pose.rightWrist.x, pose.rightWrist.y, pose.leftWrist.x, pose.leftWrist.y);
  if (d < width/5){
    fill(180, 100, 100);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, d);
  }
}

function gotPoses(_poses) {
  poses = _poses;

  while(poses.length > poseColors.length){
    let colorSet = new Array();
    for(let i = 0; i < 17; i++){
      colorSet.push(color(random(medianHue - 30, medianHue + 30), random(80, 100), random(80, 100)));
    }

    medianHue += 60;
    poseColors.push(colorSet);
  }

}

function modelLoaded() {
  console.log('poseNet ready');

}


// HELPER STUFF:

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}