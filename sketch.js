// based on
// video link: https://youtu.be/cXgA1d_E-jY& by // Daniel Shiffman // http://codingtra.in

// refactoring to three.js by Sahand Babali // sahandbabali.com


function randomGaussian()  {
  do {
    var x1 = Math.random()*2 - 1;
    var x2 = Math.random()*2 - 1;
    var w = x1 * x1 + x2 * x2;
  } while (w >= 1);
  w = Math.sqrt((-2 * Math.log(w))/w);
  return x1 * w;
}

// var p5 = new p5();

var birds = [];
var pipes = [];
var width = 640;
var height = 480;
var frameCount = 0;
const TOTAL = 20;
let savedBirds = []
let generationcounter = 0;
let generationnumdom = document.getElementById("generationnum")

// createCanvas(640, 480);
const canvas = document.getElementById("canvas1");
const scene = new THREE.Scene();
scene.background = new THREE.Color("#70c6d5");

for (let index = 0; index < TOTAL; index++) {
  birds[index] = new Bird();
}

// pipes.push(new Pipe());
/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(640, 50, 2),
  new THREE.MeshLambertMaterial({
    color: "#e3db9d",
  })
);
floor.position.y -= 1;
floor.name = "floor";
floor.position.x += width / 2;

floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

const roof = new THREE.Mesh(
  new THREE.BoxGeometry(640, 50, 2),
  new THREE.MeshLambertMaterial({
    color: "#e3db9d",
  })
);
roof.position.y = height;
roof.position.x += width / 2;
roof.name = "roof";

roof.rotation.x = -Math.PI * 0.5;
scene.add(roof);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 3000);
camera.position.set(width / 2, height / 2, 600);
scene.add(camera);
// camera.lookAt(sphere.position)

// Controls
const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(320,height/2,0)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


const tick = () => {
  // background(0);
  for (let i = scene.children.length - 1; i >= 0; i--) {
    if (scene.children[i].type === "Mesh") scene.remove(scene.children[i]);
  }


if(birds.length == 0 ){
  frameCount = 0;
  nextGeneration()
  generationcounter++;
  generationnumdom.innerHTML = generationcounter;

  pipes = []

}
if (frameCount % 200 == 0) {
  pipes.push(new Pipe());
}
frameCount++;

  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();


    for (var j = birds.length - 1; j >= 0; j--) {
         if (pipes[i].hits(birds[j])) {
          savedBirds.push(birds.splice(j,1)[0])
       // console.log("HIT");
     }
    }

  

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  for (let bird of birds) {
    bird.think(pipes);
    bird.update();
    bird.show();
  }

  scene.add(floor, roof);

  

  camera.lookAt(width / 2, height / 2, 0);

  // Update controls
   controls.target.set(width / 2, height/2, 0)

   controls.update()

  // Render
  renderer.render(scene, camera);
  frameCount++;
  window.requestAnimationFrame(tick);
};

tick();

// window.onkeypress = function (event) {
//   // console.log(event.keyCode)
//   if (event.keyCode == 115) {
//     bird.up()
//   }
// }
