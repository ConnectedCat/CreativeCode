float getBPMVis(float bpm){
    
    // this function can be found graphed out here :https://www.desmos.com/calculator/rx86e6ymw7
	float bps = 60./bpm; // beats per second
	float bpmVis = tan((time*PI)/bps);
	// multiply it by PI so that tan has a regular spike every 1 instead of PI
	// divide by the beat per second so there are that many spikes per second
	bpmVis = clamp(bpmVis,0.,10.); 
	// tan goes to infinity so lets clamp it at 10
	bpmVis =  abs(bpmVis)/20.;
	// tan goes up and down but we only want it to go up 
	// (so it looks like a spike) so we take the absolute value
	// dividing by 20 makes the tan function more spiking than smoothly going 
	// up and down, check out the desmos link to see what i mean
	bpmVis =  1.+(bpmVis*0.05); 
	// we want to multiply by this number, but its too big
	// by itself (it would be too stroby) so we want the number to multiply
	// by to be between 1.0 and 1.05 so its a subtle effect 
	return bpmVis;
}

void main () {
    vec2 pos = uv();
    float bpmV = getBPMVis(128.);
    
    
    float angle = atan(pos.y/ pos.x);
    
    float r = sin(angle+time);
    
    float coeff = cos(time)+time*.005;
    
    float orb = length(pos*(coeff*.5)*bpmV);
    
    
    
	gl_FragColor = vec4(cos(orb - time), abs(pos.x), abs(r), 1.0);
}