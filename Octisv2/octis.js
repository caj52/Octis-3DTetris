var camera, camradius;
var baseWidth = 16;
var baseHeight = 16;
var camposition = 0;
var scenes = [
    new THREE.AmbientLight((intensity = 1)),
    new THREE.AmbientLight((intensity = 0.7)),
    new THREE.AmbientLight((intensity = 0.5)),
    new THREE.AmbientLight((intensity = 0.2))
];

init();
animate();
document.addEventListener("keydown", handleKeyDown);
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

    sceneMain.add(new THREE.GridHelper(baseWidth, baseWidth, 0x5499C7, 0x5499C7)); //CREATING THE BASE'S GRID

    /****************CREATING THE GRID****************/
    var lineCol = new THREE.LineBasicMaterial({ color: 0xffffff });//initilizing the color of the lines
    var halfHeight = baseHeight / 2;
    for (x = -(baseWidth / 2); x < (baseWidth / 2); x++)//each unit is == to 16/16 or basewidth/basewidth this starts from half increments...
    // so the minimum would be -8? so thats -(basewidth/2)
    {
        // Create vertical lines
        for (i = -halfHeight; i <= halfHeight; i++)
        {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x, baseHeight, i));
            geometry.vertices.push(new THREE.Vector3(x, 0, i));
            var line = new THREE.Line(geometry, lineCol);
            sceneMain.add(line);
        }
        // Create horizonal lines
        /*
        for (i = 0; i <= halfHeight * 1.5; i++)
        {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(x, i, -14.5));
            geometry.vertices.push(new THREE.Vector3(x, i, 14.5));
            var line = new THREE.Line(geometry, lineCol);
            sceneMain.add(line);
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


    // Scene 1 - high intensity lighting, for block in the front of the queue
    var scene1 = new THREE.Scene();
    var intensity1 = 0.8;
    var lighting1 = new THREE.AmbientLight(0xf5f5f5, intensity1);
    var directional1 = new THREE.DirectionalLight(0xf5f5f5, intensity1);
    scene1.add(lighting1);
    scene1.add(directional1);
    scenes[0] = sceneMain;
    scenes[1] = scene1;



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
  // Render the current scene to the screen.
  renderer.clear();
  for (j = 0; j < scenes.length; j++) {
    renderer.render(scenes[j], camera);
  }
}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function handleKeyDown(event)
{
        switch (event.keyCode)
        {
            case 81: // Q key
                rotateGrid(true);
                break;
            case 69: // E key
                rotateGrid(false);
                break;
        }
}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function rotateGrid(leftorright)//true or false
{
    var xstat;
    var zstat;
    switch (camposition)
    {
        case 0:
            leftorright ? zstat = false : zstat = true;
            xstat = false;
            break;
        case 1:
            leftorright ? xstat = true : xstat = false;
            zstat = false;
            break;
        case 2:
            leftorright ? zstat = true : zstat = false;
            xstat = true;
            break;
        case 3:
            leftorright ? xstat = false : xstat = true;
            zstat = true;
            break;
    }

    leftorright ? camposition-- : camposition++;
    camposition < 0 ? camposition = 3 : null;
    camposition > 3 ? camposition = 0 : null;


    var localx = camera.position.x;
    var localz = camera.position.z;
    for (x = 0; x < 50; x++)//rotation loop for smooth transitions
    {
        setTimeout(
            function exec()
            {
                xstat ? localx++ : localx--;
                zstat ? localz++ : localz--;
                camera.position.set(localx, 40, localz);
                camera.lookAt(new THREE.Vector3(0, baseHeight / 2, 0));
                renderer.clear();
                for (j = 0; j < scenes.length; j++)
                {
                    renderer.render(scenes[j], camera);
                }
            }
            ,0);
    }
}

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////