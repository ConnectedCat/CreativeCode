#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 coord = 6.0 * gl_FragCoord.xy / u_resolution;
    

    for(int n = 1; n < 3; n++){
        float i = float(n);
        coord += vec2(0.7/i*sin(coord.y + u_time*i), 0.4/i*sin(coord.x+u_time));
    }
    coord *= vec2(0.7/sin(coord.y + u_time), 0.4/sin(coord.x+u_time));

    vec3 color = vec3(sin(coord.x), sin(coord.y), sin(coord.x+coord.y));

    gl_FragColor = vec4(color, 1.0);
}