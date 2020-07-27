#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 coord = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    vec2 translate = vec2(-0.5, -0.5);
    coord += translate;
    float radius = 0.3;
    

    for(int i = 0; i < 20; i++){
        float rad = radians(360.0/20.0)*float(i);
        color += 0.01*0.1/length(coord + vec2(radius*cos(rad+u_time/2.0), radius*(sin(rad+u_time/2.0))));
    }

    

    gl_FragColor = vec4(color, 1.0);
}