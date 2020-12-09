var app=function() {
	 // initiallize scene, camera, objects and renderer
	var scene, camera, renderer;
	var donuts=[];
	var randomInRange = function(min,max){
		return Math.random()*(max-min)+min;
		//Math.random() returns a floating-point in the range(0-1)
	} 
	var create_donuts = function(){
		// each donut has torus geometry. Its radius: 1;  its tube: 0.5, its radialSegments: 5 and tubularSegment: 30. 
		var geometry = new THREE.TorusGeometry(1,0.5,5,30);
		// the color of each donut is ramdom.
		var material = new THREE.MeshBasicMaterial({color:Math.random()*0xffffff});
		var donut = new THREE.Mesh(geometry,material);
		// the position of each donut is ramdom.
		donut.position.x =  randomInRange(-15,15); // donuts are everywhere on scene
		donut.position.y = 15;// each donut is on the top of the scene
		donut.position.z =  randomInRange(-15,15);// create different sizes 
		//add each donut to scence
		scene.add(donut);
		donuts.push(donut);
	} 
	var update_donut = function(donut){
		donut.position.y -= 0.1;
		donut.rotation.y -= 0.1
	}
    var init_app = function() {
        // 1. create the scene
		scene = new THREE.Scene();
		scene.background = new THREE.TextureLoader().load( "data/textures/background.jpeg" );
        // 2. create an locate the camera
		var  canvasWidth = window.innerWidth, canvasHeight  = window.innerHeight;
		var fieldOfViewY = 60, aspectRatio = canvasWidth /canvasHeight, near=0.1, far= 100.0;
		camera = new THREE.PerspectiveCamera( fieldOfViewY, aspectRatio, near, far );
		camera.position.z = 5;
        // 4. create the renderer   
		renderer = new THREE.WebGLRenderer();
		renderer.setSize( canvasWidth, canvasHeight);
		document.body.appendChild( renderer.domElement );
    };
    // main animation loop - calls every 50-60 ms.
    var mainLoop = function() {
		create_donuts();
		donuts.forEach(update_donut);
		renderer.render( scene, camera );
		requestAnimationFrame( mainLoop );
    };
    init_app();
    mainLoop();
}

  