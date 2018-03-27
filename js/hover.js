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

		uniform sampler2D texture;
		uniform sampler2D texture2;
		uniform sampler2D disp;

		// uniform float time;
		// uniform float _rot;
		uniform float dispFactor;
		uniform float effectFactor;

		// vec2 rotate(vec2 v, float a) {
		// 	float s = sin(a);
		// 	float c = cos(a);
		// 	mat2 m = mat2(c, -s, s, c);
		// 	return m * v;
		// }

		void main() {

			vec2 uv = vUv;

			// uv -= 0.5;
			// vec2 rotUV = rotate(uv, _rot);
			// uv += 0.5;

			vec4 disp = texture2D(disp, uv);

			vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
			vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

			vec4 _texture = texture2D(texture, distortedPosition);
			vec4 _texture2 = texture2D(texture2, distortedPosition2);

			vec4 finalTexture = mix(_texture, _texture2, dispFactor);

			gl_FragColor = finalTexture;
			// gl_FragColor = disp;
		}
	`;

	var parent = opts.parent || console.warn('no parent');
	var dispImage = opts.displacementImage || console.warn('displacement image missing');
	var image1 = opts.image1 || console.warn('first image missing');
	var image2 = opts.image2 || console.warn('second image missing');
	var intensity = opts.intensity || 1;
	var speedIn = opts.speedIn || 1.6;
	var speedOut = opts.speedOut || 1.2;

	// var clock = new THREE.Clock(true);

	var scene = new THREE.Scene();
	var camera = new THREE.OrthographicCamera( parent.offsetWidth / - 2, parent.offsetWidth / 2, parent.offsetHeight / 2, parent.offsetHeight / - 2, 1, 1000 );

	camera.position.z = 1;

	var renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.setPixelRatio = 1;
	renderer.setClearColor(0xFFFFFF, 0.0);
	renderer.setSize( parent.offsetWidth, parent.offsetHeight );
	parent.appendChild( renderer.domElement );

	var addToGPU = function(t){
		renderer.setTexture2D(t, 0);
	}

	var loader = new THREE.TextureLoader();
	loader.crossOrigin = '';
	var texture1 = loader.load(image1, function(texture){addToGPU(texture)});
	var texture2 = loader.load(image2, function(texture){addToGPU(texture)});

	var disp = loader.load(dispImage);
	disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

	// texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
	// texture1.minFilter = texture2.minFilter = THREE.LinearMipMapLinearFilter;

	texture1.anisotropy = renderer.getMaxAnisotropy();
	texture2.anisotropy = renderer.getMaxAnisotropy();

	var mat = new THREE.ShaderMaterial({
		uniforms: {

			// time: { type: "f", value: 1.0 },
			// _rot: { type: "f", value: 0.0 },
			effectFactor: { type: "f", value: intensity },
			dispFactor: { type: "f", value: 0.0 },
			texture: { type: 't', value: texture1 },
			texture2: { type: 't', value: texture2 },
			disp: { type: 't', value: disp },
		},

		vertexShader: vertex,
		fragmentShader: fragment,
		transparent: true,
		opacity: 1.0
	});

	var geometry = new THREE.PlaneBufferGeometry( parent.offsetWidth, parent.offsetHeight, 1 );
	var object = new THREE.Mesh(geometry, mat);
	scene.add(object);

	// var c = false;
	parent.addEventListener('mouseenter', function(){
		TweenMax.to(mat.uniforms.dispFactor, speedIn, {value: 1, ease: Expo.easeOut});
	});

	parent.addEventListener('mouseleave', function(){
		TweenMax.to(mat.uniforms.dispFactor, speedOut, {value: 0, ease: Expo.easeOut});
	});

	var animate = function () {
		requestAnimationFrame( animate );

		renderer.render(scene, camera);

		// var d = clock.getDelta();
		// mat.uniforms.time.value += d;
	};
	animate();
}
