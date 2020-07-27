#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 coord = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    vec2 translate = vec2(-0.5);
    coord += translate;

    color.r += abs(length(coord) - 0.5 * abs(sin(u_time*0.9/12.0))); 
    color.g += abs(length(coord) - 0.5 * abs(sin(u_time*0.6/3.0))); 
    color.b += abs(length(coord) - 0.5 * abs(sin(u_time*0.3/9.0)));    

    gl_FragColor = vec4(0.1/color, 1.0);
}