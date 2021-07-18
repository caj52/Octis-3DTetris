var camera, camradius;
var baseWidth = 16;
var baseHeight = 16;
var halfHeight;
var halfWidth;
var camposition = 0;
var run = false;
var xstat;
var zstat;
var rotcount = 0;
var initclock = new Date().getTime();
var sclock;
var localx;
var localz;
var ignoreInput = false;
var cyclelength = 20;//miliseconds
var check = false;
var cube;
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
 /************VARIABLE-INITS****************/
    halfHeight = baseHeight / 2;
    halfWidth = baseWidth / 2;

    var startingBoxTop = [
        new THREE.Vector3(-halfWidth, baseHeight, -halfWidth),
        new THREE.Vector3(halfWidth, baseHeight, -halfWidth),
        new THREE.Vector3(halfWidth, baseHeight, halfWidth),
        new THREE.Vector3(-halfWidth, baseHeight, halfWidth),
        new THREE.Vector3(-halfWidth, baseHeight, -halfWidth),
    ];
    var startingBoxSides = [
        new THREE.Vector3(halfWidth, baseHeight, -halfWidth),
        new THREE.Vector3(halfWidth, 0, -halfWidth),
        new THREE.Vector3(-halfWidth, baseHeight, -halfWidth),
        new THREE.Vector3(-halfWidth, 0, -halfWidth),
        new THREE.Vector3(halfWidth, baseHeight, halfWidth),
        new THREE.Vector3(halfWidth, 0, halfWidth),
        new THREE.Vector3(-halfWidth, baseHeight, halfWidth),
        new THREE.Vector3(-halfWidth, 0, halfWidth),
    ];
/************VARIABLE-INITS****************/
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
    camera.lookAt(new THREE.Vector3(0, halfHeight, 0));
    camradius = Math.sqrt
    (
        Math.pow(camera.position.x, 2) +
        Math.pow(camera.position.y, 2) +
        Math.pow(camera.position.z, 2)
    );
/******************************************/

/****************CREATING THE BOX****************/
    sceneMain.add(new THREE.GridHelper(baseWidth, baseWidth, 0x5499C7, 0x5499C7)); //CREATING THE BASE'S GRID
    var lineCol = new THREE.LineBasicMaterial({ color: 0xffffff });//initilizing the color of the lines

    var geometry = new THREE.Geometry();
    for (x = 0; x < startingBoxTop.length; x++)
    {
        geometry.vertices.push(startingBoxTop[x])
    }
    var line = new THREE.Line(geometry, lineCol);
    sceneMain.add(line);

    var count = 0;
    for (x = 0; x < 4; x++)
    {
        var geometry = new THREE.Geometry();
        for (y = 0; y < 2; y++)
        {
                geometry.vertices.push(startingBoxSides[count]);
            console.log(x + y);
            count++;
        }
        var line = new THREE.Line(geometry, lineCol);
        sceneMain.add(line);
    }
/****************CREATING THE BOX****************/

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
    if (!ignoreInput)
    {
        switch (event.keyCode)
        {
            case 81: // Q key
                rotateGrid(true);
                break;
            case 69: // E key
                rotateGrid(false);
                break;
            case 32: //SPACE
                createCube();
                break;
            case 38:
                moveBlock('forward');
                break;
            case 40:
                moveBlock('back');
                break;
            case 37:
                moveBlock('left');
                break;
            case 39:
                moveBlock('right');
                break;
        }
    }
}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function rotateGrid(leftorright)//true or false
{
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
    localx = camera.position.x;
    localz = camera.position.z;
    rotcount = 0;
    run = true;
}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
setInterval(function isRotating()
{
    if (run)//time based rotation loop for smooth transitions
    {
        ignoreInput = true;
        sclock = new Date().getTime();
        if (sclock - initclock > cyclelength)
        {
            check = true;
        }
        if (check)
        {
            xstat ? localx++ : localx--;
            zstat ? localz++ : localz--;
            camera.position.set(localx, 40, localz);
            camera.lookAt(new THREE.Vector3(0, halfHeight, 0));
            renderer.clear();
            for (j = 0; j < scenes.length; j++)
            {
                renderer.render(scenes[j], camera);
            }
            rotcount++;
            check = false;
            if (rotcount > 49) { run = false; ignoreInput = false; }
        }
    }
}, 5);
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function createCube()
{
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var col = getRandomColor();
    var material = new THREE.MeshPhongMaterial({ color: col });
    cube = new THREE.Mesh(geometry, material);
    sceneMain.add(cube);
    cube.position.set(0, 10, 0);
}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function getRandomColor()
{
    var letters = "0123456789ABCDEF";
    var col = "#";
    for (var i = 0; i < 6; i++)
    {
        col += letters[Math.floor(Math.random() * 16)];
    }
    return col;
}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
function moveBlock(direction)
{
    switch (direction)
    {
        case 'forward':
            cube.position.x-=1;
            break;
        case 'back':
            cube.position.x += 1;
            break;
        case 'left':
            cube.position.z += 1;
            break;
        case 'right':
            cube.position.z -= 1;
            break;
    }
}
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////