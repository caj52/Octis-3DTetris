// JavaScript source code
var box;
var cube;
const pBox = new THREE.Group();
var predictionBoxInit;
init();
class blocktypes
{
    constructor(blocknum)
    {
        getBlock(blocknum);

    }
}

function getBlock(blocknum)
{
    switch (blocknum)
    {
        case 1:
            return box;
            break;
    }
}


function init()
{
     box = [
        new THREE.Vector3(0.5, 10, 0.5),
        new THREE.Vector3(-0.5, 10, 0.5),
        new THREE.Vector3(0.5, 11, 0.5),
        new THREE.Vector3(-0.5, 11, 0.5),
        new THREE.Vector3(0.5, 10, 1.5),
        new THREE.Vector3(-0.5, 10, 1.5),
        new THREE.Vector3(0.5, 11, 1.5),
        new THREE.Vector3(-0.5, 11, 1.5),
     ];
    predictionBoxInit = [
        new THREE.Vector3(0, baseHeight, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, baseHeight, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(1, baseHeight, 1),
        new THREE.Vector3(1, 0, 1),
        new THREE.Vector3(0, baseHeight, 1),
        new THREE.Vector3(0, 0, 1),
    ];
}
function createCube(blocktype)
{
    thisBlock = new THREE.Group();
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var col = getRandomColor();
    const material = new THREE.MeshPhongMaterial({
        color: col,
        opacity: 1,
        transparent: true,
    });
    for (x = 0; x < 8; x++)
    {
        cube = new THREE.Mesh(geometry, material);
        cube.position.set(blocktype[x].x, blocktype[x].y, blocktype[x].z);
        thisBlock.add(cube);
        console.log(cube.position);
    }
    sceneMain.add(thisBlock);
    //thisBlock.position.set(0.5, 10, 0.5);

    createPredictionBox();
}
function createPredictionBox()
{
    var count = 0;
    var lineCol = new THREE.LineBasicMaterial({ color: 0xffffff });
    for (x = 0; x < 4; x++)
    {
        var geometry = new THREE.Geometry();
        for (y = 0; y < 2; y++)
        {
            geometry.vertices.push(predictionBoxInit[count])
            count++
        }
        var line = new THREE.Line(geometry, lineCol);
        line.position = cube.position;
        pBox.add(line);
    }
    sceneMain.add(pBox);
}

function movePredictionBox()
{
    pBox.position.set(cube.position.x - .5, 0, cube.position.z - .5);

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