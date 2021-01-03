float circ(vec2 p, float rad){
    return length(p) - rad;
}

float sdBox( in vec2 p, in vec2 b ){
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

vec3 cosPalette( float t , vec3 brightness, vec3 contrast, vec3 osc, vec3 phase){

    return brightness + contrast*cos( 6.28318*(osc*t+phase) );
}


void main () {
    vec2 pos = uv();
    pos.x = pos.x - time*.1;
    float shape2 = circ(pos*3., .5);
    
    pos.x = pos.x + time*.1;
    pos = mod(pos, vec2(.5))- vec2(.25);
    
    float shape1 = sdBox(pos * 3., vec2(.6));
    
    shape1 = ceil(shape1);
    
    vec3 brightness = vec3(.3);
    vec3 contrast = vec3(.3, .12, .13);
    vec3 osc = vec3(.2, .3, .1);
    vec3 phase = vec3(abs(cos(time*.0005)));
    
    float shape = shape1 - shape2;
    
    vec3 color = cosPalette(shape+cos(time)*.3, brightness, contrast, osc, phase);
    
	gl_FragColor = vec4(color.x, color.y, color.z, 1);
}