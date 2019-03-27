#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
	center.set(ofGetWidth()/2, ofGetHeight()/2);
	ofSetCircleResolution(circleResolution);
}

//--------------------------------------------------------------
void ofApp::update(){
	for (int i = 0; i < radialPoints; i++) {
		float x = center.x + (float)cos((TWO_PI / radialPoints)*i) * circleRadius;
		float y = center.y + (float)sin((TWO_PI / radialPoints)*i) * circleRadius;
		drawPoints.push_back(ofVec2f(x, y));

		x = center.x + (float)cos((TWO_PI / radialPoints)*i- PI / radialPoints) * cos(PI / radialPoints) * circleRadius * 2;
		y = center.y + (float)sin((TWO_PI / radialPoints)*i - PI / radialPoints) * cos(PI / radialPoints) * circleRadius * 2;
		
		drawPoints2.push_back(ofVec2f(x, y));
		
		
		x = center.x + (float)cos((TWO_PI / radialPoints)*i) * circleRadius * 2;
		y = center.y + (float)sin((TWO_PI / radialPoints)*i) * circleRadius * 2;
		drawPoints3.push_back(ofVec2f(x, y));

	}
}

//--------------------------------------------------------------
void ofApp::draw(){
	ofEnableAlphaBlending();
	ofSetColor(0, 0, 255, 75);
	//ofNoFill();
	ofDrawCircle(center, circleRadius);
	ofDisableAlphaBlending();

	for (int i = 0; i < radialPoints; i++) {
		ofEnableAlphaBlending();
		ofSetColor(255, 0, 0, 75);
		//ofNoFill();
		ofDrawCircle(drawPoints[i], circleRadius);
		//ofDrawCircle(drawPoints2[i], circleRadius);
		//ofDrawCircle(drawPoints3[i], circleRadius);
		ofDisableAlphaBlending();

		//ofSetColor(0, 0, 0);
		//ofDrawLine(center, drawPoints[i]);
		//ofDrawLine(drawPoints[i], drawPoints2[i]);
		//ofDrawLine(drawPoints2[i], drawPoints3[i]);
		//ofDrawLine(drawPoints3[i], drawPoints[i]);
		//if (i < radialPoints - 1) {
		//	ofDrawLine(drawPoints[i], drawPoints[i + 1]);
		//	ofDrawLine(drawPoints2[i], drawPoints2[i + 1]);
		//	ofDrawLine(drawPoints3[i], drawPoints3[i + 1]);
		//}
		//else {
		//	ofDrawLine(drawPoints[i], drawPoints[0]);
		//	ofDrawLine(drawPoints2[i], drawPoints2[0]);
		//	ofDrawLine(drawPoints3[i], drawPoints3[0]);
		//}
	}
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
