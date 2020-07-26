class Body {
    constructor() {
        //this.update(_pose, _sourceFrame);

        this.fillColor = color(0);
        this.strokeColor = color(0, 255, 255);
        this.strokeWeight = 3;
        this.wristSize = 20;
    }

    update(_pose, _sourceFrame = createVector(640, 480)) {
        let targetFrame = createVector(width, width * _sourceFrame.y / _sourceFrame.x);

        this.leftAnkle = {
            x: map(_pose.pose.leftAnkle.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.leftAnkle.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.leftAnkle.confidence
        }
        this.leftElbow = {
            x: map(_pose.pose.leftElbow.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.leftElbow.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.leftElbow.confidence
        }
        this.leftEar = {
            x: map(_pose.pose.leftEar.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.leftEar.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.leftEar.confidence
        }
        this.leftEye = {
            x: map(_pose.pose.leftEye.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.leftEye.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.leftEye.confidence
        }
        this.leftHip = {
            x: map(_pose.pose.leftHip.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.leftHip.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.leftHip.confidence
        }
        this.leftKnee = {
            x: map(_pose.pose.leftKnee.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.leftKnee.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.leftKnee.confidence
        }
        this.leftShoulder = {
            x: map(_pose.pose.leftShoulder.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.leftShoulder.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.leftShoulder.confidence
        }
        this.leftWrist = {
            x: map(_pose.pose.leftWrist.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.leftWrist.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.leftWrist.confidence
        }
        this.nose = {
            x: map(_pose.pose.nose.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.nose.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.nose.confidence
        }
        this.rightAnkle = {
            x: map(_pose.pose.rightAnkle.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.rightAnkle.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.rightAnkle.confidence
        }
        this.rightElbow = {
            x: map(_pose.pose.rightElbow.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.rightElbow.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.rightElbow.confidence
        }
        this.rightEar = {
            x: map(_pose.pose.rightEar.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.rightEar.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.rightEar.confidence
        }
        this.rightEye = {
            x: map(_pose.pose.rightEye.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.rightEye.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.rightEye.confidence
        }
        this.rightHip = {
            x: map(_pose.pose.rightHip.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.rightHip.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.rightHip.confidence
        }
        this.rightKnee = {
            x: map(_pose.pose.rightKnee.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.rightKnee.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.rightKnee.confidence
        }
        this.rightShoulder = {
            x: map(_pose.pose.rightShoulder.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.rightShoulder.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.rightShoulder.confidence
        }
        this.rightWrist = {
            x: map(_pose.pose.rightWrist.x, 0, _sourceFrame.x, 0, targetFrame.x),
            y: map(_pose.pose.rightWrist.y, 0, _sourceFrame.y, 0, targetFrame.y),
            confidence: _pose.pose.rightWrist.confidence
        }

        this.headCentroid = {
            x: (this.nose.x + this.leftEye.x + this.rightEye.x) / 3,
            y: (this.nose.y + this.leftEye.y + this.rightEye.y) / 3
        }

        this.headWidth = dist(this.leftEar.x, this.leftEar.y, this.rightEar.x, this.rightEar.y);

        return true;
    }

    show() {
        fill(this.fillColor);
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);
        //draw head
        ellipse(this.headCentroid.x, this.headCentroid.y, this.headWidth, this.headWidth * 1.61);

        //draw torso
        beginShape();
        vertex(this.leftShoulder.x, this.leftShoulder.y);
        vertex(this.rightShoulder.x, this.rightShoulder.y);
        vertex(this.rightHip.x, this.rightHip.y);
        vertex(this.leftHip.x, this.leftHip.y);
        vertex(this.leftShoulder.x, this.leftShoulder.y);
        endShape();
        
        //draw arms
        line(this.leftShoulder.x, this.leftShoulder.y, this.leftElbow.x, this.leftElbow.y);
        line(this.leftElbow.x, this.leftElbow.y, this.leftWrist.x, this.leftWrist.y);
        line(this.rightShoulder.x, this.rightShoulder.y, this.rightElbow.x, this.rightElbow.y);
        line(this.rightElbow.x, this.rightElbow.y, this.rightWrist.x, this.rightWrist.y);

        ellipse(this.rightWrist.x, this.rightWrist.y, this.wristSize*2, this.wristSize*2);
        ellipse(this.leftWrist.x, this.leftWrist.y, this.wristSize*2, this.wristSize*2);
    }

    catchData(){
        datapoints.forEach((datapoint, index) => {
            let rHdist = dist(this.rightWrist.x, this.rightWrist.y, datapoint.pos.x, datapoint.pos.y);
            let lHdist = dist(this.leftWrist.x, this.leftWrist.y, datapoint.pos.x, datapoint.pos.y);
            if(rHdist < datapoint.radius + this.wristSize || lHdist < datapoint.radius + this.wristSize) {
                datapoint.clr = color(255, 0, 255);
                datapoints.splice(index, 1);
            }
        })
    }

    inBody(_vectorPoint = createVector(0,0)){
        return (_vectorPoint.x < this.rightShoulder.x && _vectorPoint.x > this.leftShoulder.x && _vectorPoint.y > this.leftShoulder.y && _vectorPoint.y < this.leftHip.y);
    }
}