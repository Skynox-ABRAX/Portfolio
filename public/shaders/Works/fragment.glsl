uniform float uTime;
uniform sampler2D uBackground;
uniform sampler2D uBackground2;
uniform float uProgress;
uniform float uOpacity;
varying vec2 vUv;

void main(){


       vec4 texture1 = vec4(texture2D(uBackground, vUv));
        vec4 texture2 = vec4(texture2D(uBackground2, vUv));

    vec4 textMix= mix(texture1, texture2,uProgress);


    // //float coef= (text.r + text.g + text.b) /20.;

    // //float mixTex = mix(text.w, 0.5, 0.2);




    // // gl_FragDepth = gl_FragCoord.z + 1.;
    // // if(gl_FragCoord.x < 900.) {
        
    // //     gl_FragColor = vec4(0.8,0.5,1.,1.);
    // // }else{

    // //gl_FragColor = vec4(0.2,0.7,0.3,1.);


    //     gl_FragColor = textMix;

   // vec4 tex = texture2D(uBackground, vUv);

    //gl_FragColor = vec4(textMix.xyz, textMix.w * uProgress);
    gl_FragColor = vec4(textMix.xyz, textMix.w * uOpacity);


    //gl_FragColor = vec4(0.5,0.4,0.7,1.0);

}