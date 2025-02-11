float fadeDist = 350.0;
float dist = length(vViewPosition);
  
float fadeOpacity = smoothstep(fadeDist, 0.0, dist);
fadeOpacity = exponentialEasing(fadeOpacity, 0.93);
vec4 diffuseColor = vec4( diffuse, fadeOpacity * opacity );
