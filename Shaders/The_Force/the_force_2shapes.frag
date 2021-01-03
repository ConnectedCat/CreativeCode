float circ(vec2 p ){
    
    return length(p) -0.5;
}

float sdBox( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

vec3 cosPalette( float t , vec3 brightness, vec3 contrast, vec3 osc, vec3 phase)
{

    return brightness + contrast*cos( 6.28318*(osc*t+phase) );
}

void main () {
    vec2 pos = uv() ;
    pos.x = pos.x-time/5.;
    pos = mod(pos,vec2(1.))- vec2(0.5);

    float shape1 = circ(pos * 4.);
    pos = pos + vec2(sin(time),0)*0.45;
    float shape2 = sdBox(pos,vec2(0.1));
    shape2 = ceil(shape2);
    
    vec3 brightness = vec3(0.3);
    vec3 contrast = vec3(0.2,0.23,0.34);
    vec3 osc = vec3(0.2,0.4,0.3);
    vec3 phase = vec3(0.3);
    
    float shape = min(shape2, shape1);
    
    vec3 color = cosPalette(shape -time/5., brightness, contrast, osc, phase);
    
	gl_FragColor = vec4(color, 1.);
}
