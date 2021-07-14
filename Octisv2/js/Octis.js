init();

function init()
{
    sceneMain = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(50, 40, 0);
    camera.lookAt(new THREE.Vector3(0, gameHeight / 2, 0));

    sceneMain.add(new THREE.GridHelper(30, 60, 0xffffff));

}