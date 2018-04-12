var hoverEffect = function(opts) {
  var vertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

  var fragment = `
varying vec2 vUv;

uniform float dispFactor;
uniform sampler2D disp;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform float angle1;
uniform float angle2;
uniform float intensity1;
uniform float intensity2;

mat2 getRotM(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

void main() {
  vec4 disp = texture2D(disp, vUv);
  vec2 dispVec = vec2(disp.r, disp.g);
  vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * intensity1 * dispFactor;
  vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
  vec4 _texture1 = texture2D(texture1, distortedPosition1);
  vec4 _texture2 = texture2D(texture2, distortedPosition2);
  gl_FragColor = mix(_texture1, _texture2, dispFactor);
}
`;

  var parent = opts.parent || console.warn('no parent');
  var dispImage = opts.displacementImage || console.warn('displacement image missing');
  var image1 = opts.image1 || console.warn('first image missing');
  var image2 = opts.image2 || console.warn('second image missing');
  var intensity1 = opts.intensity1 || opts.intensity || 1;
  var intensity2 = opts.intensity2 || opts.intensity || 1;
  var angle1 = opts.angle1 || opts.angle || 0;
  var angle2 = opts.angle2 || opts.angle || 0;
  var speedIn = opts.speedIn || opts.speed || 1.6;
  var speedOut = opts.speedOut || opts.speed || 1.2;
  var userHover = opts.hover === undefined ? true : opts.hover;
  var easing = opts.easing || Expo.easeOut;

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(
    parent.offsetWidth / -2,
    parent.offsetWidth / 2,
    parent.offsetHeight / 2,
    parent.offsetHeight / -2,
    1,
    1000
  );

  camera.position.z = 1;

  var renderer = new THREE.WebGLRenderer({ antialias: false });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 0.0);
  renderer.setSize(parent.offsetWidth, parent.offsetHeight);
  parent.appendChild(renderer.domElement);

  var loader = new THREE.TextureLoader();
  loader.crossOrigin = '';
  var texture1 = loader.load(image1);
  var texture2 = loader.load(image2);

  var disp = loader.load(dispImage);
  disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

  texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
  texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

  var mat = new THREE.ShaderMaterial({
    uniforms: {
      intensity1: { type: 'f', value: intensity1 },
      intensity2: { type: 'f', value: intensity2 },
      dispFactor: { type: 'f', value: 0.0 },
      angle1: { type: 'f', value: angle1 },
      angle2: { type: 'f', value: angle2 },
      texture1: { type: 't', value: texture1 },
      texture2: { type: 't', value: texture2 },
      disp: { type: 't', value: disp },
    },

    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    opacity: 1.0,
  });

  var geometry = new THREE.PlaneBufferGeometry(parent.offsetWidth, parent.offsetHeight, 1);
  var object = new THREE.Mesh(geometry, mat);
  scene.add(object);

  function transitionIn() {
    TweenMax.to(mat.uniforms.dispFactor, speedIn, {
      value: 1,
      ease: easing,
    });
  };

  function transitionOut() {
    TweenMax.to(mat.uniforms.dispFactor, speedOut, {
      value: 0,
      ease: easing,
    });
  };

  if (userHover) {
    parent.addEventListener('mouseenter', transitionIn);
    parent.addEventListener('touchstart', transitionIn);
    parent.addEventListener('mouseleave', transitionOut);
    parent.addEventListener('touchend', transitionOut);
  }

  window.addEventListener('resize', function(e) {
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
  });

  this.next = transitionIn;
  this.previous = transitionOut;

  var animate = function() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  };
  animate();
};
