﻿var camera, camradius;
var baseWidth = 15;
var baseHeight = 15;
var sceneQueue = [
    new THREE.AmbientLight((intensity = 1)),
    new THREE.AmbientLight((intensity = 0.7)),
    new THREE.AmbientLight((intensity = 0.5)),
    new THREE.AmbientLight((intensity = 0.2))
];

init();
animate();




//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
function init()
{
    /*****CAMERA VARIABLE INITIILIZATIONS******/
    sceneMain = new THREE.Scene();
    camera = new THREE.PerspectiveCamera
    (
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(50, 40, 0);
    camera.lookAt(new THREE.Vector3(0, baseHeight / 2, 0));
    camradius = Math.sqrt
    (
        Math.pow(camera.position.x, 2) +
        Math.pow(camera.position.y, 2) +
        Math.pow(camera.position.z, 2)
    );
    /******************************************/

    sceneMain.add(new THREE.GridHelper(16, 16, 0xffffff, 0x5499C7)); //CREATING THE BASE'S GRID

    /****************CREATING THE GRID****************/
    var lineMaterial = new THREE.LineBasicMaterial({ color: 0x5499C7 });
    for (x = -0.5; x <= 0.5; x++)
    {
        // Create vertical lines
        for (i = -14.5; i <= 14.5; i++)
        {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x, baseHeight * 1.5 - 0.5, i));
            geometry.vertices.push(new THREE.Vector3(x, 0, i));
            var line = new THREE.Line(geometry, lineMaterial);
            sceneMain.add(line);
        }
        /*
        // Create horizonal lines
        for (i = 0; i <= baseHeight * 1.5; i++)
        {
            var geometry = new THREE.Geometry();
            if (i == baseHeight)
            {
                lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
            }
            geometry.vertices.push(new THREE.Vector3(x, i, -14.5));
            geometry.vertices.push(new THREE.Vector3(x, i, 14.5));
            var line = new THREE.Line(geometry, lineMaterial);
            sceneMain.add(line);
            if (i == baseHeight)
            {
                lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
            }
        }
        */
    }
    /*************************************************/




        /*

    // Join front and back vertical grid with lines along the sides
    for (z = -14.5; z <= 14.5; z = z + 29)
    {
        for (y = 1; y <= baseHeight * 1.5; y++)
        {
            if (y == baseHeight)
            {
                lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
            }
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(-0.5, y, z));
            geometry.vertices.push(new THREE.Vector3(0.5, y, z));
            var line = new THREE.Line(geometry, lineMaterial);
            sceneMain.add(line);
            if (y == baseHeight)
            {
                lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
            }
        }
    }
    // Join front and back vertical grid with lines across the top
    for (z = -13.5; z <= 13.5; z++)
    {
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-0.5, baseHeight * 1.5 - 0.5, z));
        geometry.vertices.push(new THREE.Vector3(0.5, baseHeight * 1.5 - 0.5, z));
        var line = new THREE.Line(geometry, lineMaterial);
        sceneMain.add(line);
    }
    */
    // Add directional lighting to scene.
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.x = 10;
    directionalLight.position.y = 10;
    directionalLight.position.z = 0;
    directionalLight.intensity = 1.5;
    sceneMain.add(directionalLight);
    var ambientLight = new THREE.AmbientLight();
    ambientLight.intensity = 0.2;
    sceneMain.add(ambientLight);

    // Create a queue of scenes with different lighting for blocks in the queue
    // Scene 1 - high intensity lighting, for block in the front of the queue
    var scene1 = new THREE.Scene();
    var intensity1 = 0.8;
    var lighting1 = new THREE.AmbientLight(0xf5f5f5, intensity1);
    var directional1 = new THREE.DirectionalLight(0xf5f5f5, intensity1);
    scene1.add(lighting1);
    scene1.add(directional1);
    /*
    // Scene 2 - medium intensity lighting, for block second in the queue
    var scene2 = new THREE.Scene();
    var intensity2 = 0.5;
    var lighting2 = new THREE.AmbientLight(0xf5f5f5, intensity2);
    var directional2 = new THREE.DirectionalLight(0xf5f5f5, intensity2);
    scene2.add(lighting2);
    scene2.add(directional2);

    // Scene 3 - low intensity lighting, for block third in the queue
    var scene3 = new THREE.Scene();
    var intensity3 = 0.2;
    var lighting3 = new THREE.AmbientLight(0xf5f5f5, intensity3);
    var directional3 = new THREE.DirectionalLight(0xf5f5f5, intensity3);
    scene3.add(lighting3);
    scene3.add(directional3);
    */



    // Add scenes to scene queue
    sceneQueue[0] = sceneMain;
    sceneQueue[1] = scene1;
  //  sceneQueue[2] = scene2;
   // sceneQueue[3] = scene3;



    // Set up the Web GL renderer.
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);



    // Handle resizing of the browser window.
    window.addEventListener("resize", handleResize, false);
    //initialiseGame();

}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function handleResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function animate() 
{
  requestAnimationFrame(animate);
    /*
  if (!gameOver) {
    if (beenASecond()) {
      if (moveDown()) {
        updateGameOver();
        if (!gameOver) {
          updateQueue();
        } else {
          alert("Game Over!");
        }
      }
    }
  }
  */
  // Render the current scene to the screen.
  renderer.clear();
  for (j = 0; j < sceneQueue.length; j++) {
    renderer.render(sceneQueue[j], camera);
  }
}