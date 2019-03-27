#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
	radius = 100;

	iterator = 0;

	center.set(0, 0, 0);
	drawVector.set(center.x + radius, center.y, 0.0f);
	
	//ofSetCircleResolution(100);
	numberOfPoints = 7;
	angle = TWO_PI / numberOfPoints;

	ofEnableDepthTest();
	ofSetVerticalSync(true);

	//cam.setDistance(500);
}

//--------------------------------------------------------------
void ofApp::update(){


	
	for (int i = 0; i < numberOfPoints; i++) {
		drawVector.rotateRad(angle, ofVec3f(center.x, center.y, 1));
		drawPoints.push_back(drawVector);
	}
	
	for (int i = 0; i < numberOfPoints; i++) {
		drawVector.rotateRad(angle, ofVec3f(center.x, 1, center.z));
		drawPoints.push_back(drawVector);
	}

	for (int i = 0; i < numberOfPoints; i++) {
		drawVector.rotateRad(angle, ofVec3f(1, center.y, center.z));
		drawPoints.push_back(drawVector);
	}
}

//--------------------------------------------------------------
void ofApp::draw(){
	cam.begin();
	ofEnableAlphaBlending();
	ofSetColor(0, 0, 255, 75);
	ofDrawSphere(center, radius);
	ofDisableAlphaBlending();


	for (int i = 0; i < numberOfPoints*3; i++) {
		ofEnableAlphaBlending();
		ofSetColor(255, 0, 0, 75);
		ofDrawSphere(drawPoints[i], radius);
		ofDisableAlphaBlending();
	}

	cam.end();
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
