#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 coord = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    float size = 12.0;
    float alpha = sin(floor(coord.x * size) + u_time * 4.0) + 0.5;

    gl_FragColor = vec4(color, alpha);
}