import * as THREE from "three";
import { GeometryHelper } from "game/GeometryHelper.js";
import { Vector3 } from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import * as dat from "dat.gui";

// dodajemy obiekty, światłam, kamerę
let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
  75, // fov
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1,
  1000
);

camera.position.set(4, 2, 6);
camera.lookAt(0, 0, 0);
scene.add(camera);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x101010);

document.body.appendChild(renderer.domElement);

const geometryHelper = new GeometryHelper();

const orbitControls = new OrbitControls(camera, renderer.domElement);

const gridXZ = new THREE.GridHelper(10, 10);
scene.add(gridXZ);

scene.add(geometryHelper.createAxesHelper(5));

const stats = Stats();
document.body.appendChild(stats.dom);

const cubeTextures = new THREE.CubeTextureLoader()
  .setPath("../assets/textures/cube1/")
  .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

scene.background = cubeTextures;

let text3d = null;

const textMaterial = new THREE.MeshPhongMaterial();
textMaterial.envMap = cubeTextures;

function updatePoints(pointsNum) {
  geometryHelper.create3dText({
    str: "Punkty:" + pointsNum,
    curveSegments: 36,
    size: 0.4,
    height: 0.2,
    callbackReady: function (readyText3d) {
      gameWorld.remove(points3dText);
      points3dText = readyText3d;
      points3dText.position.set(-5, 0, 2);
      points3dText.rotation.y = Math.PI / 2;
      gameWorld.add(points3dText);
    },
  });
}

let stackBlocks = [];

let points3dText = null;

let gameWorld = new THREE.Object3D();
scene.add(gameWorld);

let flyingBlock = null;

const blockWidth = 3;
const blockHeight = 0.3;
const blockDepth = 3;

function generateBlockMesh({
  width = blockWidth,
  height = blockHeight,
  depth = blockDepth,
  type = "z",
  color = null,
} = {}) {
  const colorsArr = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
    "aqua",
    "black",
    "silver",
    "gold",
    "grey",
  ];

  const randomColor = colorsArr[Math.floor(Math.random() * colorsArr.length)];

  if (!color) color = randomColor;

  let blockMaterial = new THREE.MeshLambertMaterial({
    color: color,
  });

  let blockMesh = geometryHelper.createSimpleCube({
    width: width,
    height: height,
    depth: depth,
    material: blockMaterial,
  });

  blockMesh.position.x += width / 2;
  blockMesh.position.y -= height / 2;
  blockMesh.position.z += depth / 2;

  const blockData = {
    type: type,
    width: width,
    height: height,
    depth: depth,
    material: blockMaterial,
    mesh: blockMesh,
    color: color,
  };

  return blockData;
}

function addBlock() {
  let firstBlock = false;

  if (stackBlocks.length === 0) {
    firstBlock = true;
  }

  if (flyingBlock) {
    stackBlocks.push(flyingBlock);
  }

  let blockData = generateBlockMesh({
    type: "z",
  });

  if (!firstBlock) blockData.mesh.position.z -= 7;

  gameWorld.add(blockData.mesh);

  if (firstBlock) {
    stackBlocks.push(blockData);
  } else {
    flyingBlock = blockData;

    updateStack();
  }

  updatePoints(stackBlocks.length - 1);
}

function updateStack() {
  stackBlocks.forEach((block) => {
    block.mesh.position.y -= block.height;
  });
}

function flyingBlockFrameUpdate(time, timePassed) {
  let speed = 0.0015;
  if (flyingBlock) {
    if (flyingBlock.type == "z") {
      flyingBlock.mesh.position.z += speed * timePassed;
    }
  }
}

addBlock();

function checkIntersection() {
  if (stackBlocks.length === 0) {
    return;
  }

  if (!flyingBlock) {
    addBlock();
    return;
  }

  const topBlock = stackBlocks[stackBlocks.length - 1];
  const topPosition = topBlock.mesh.position;

  const flyingPosition = flyingBlock.mesh.position;

  if (flyingBlock.type == "z") {
    const topZ1 = topPosition.z - topBlock.depth / 2;
    const topZ2 = topPosition.z + topBlock.depth / 2;

    const flyZ1 = flyingPosition.z - flyingBlock.depth / 2;
    const flyZ2 = flyingPosition.z + flyingBlock.depth / 2;

    if (flyZ1 == topZ1 && flyZ2 == topZ2) {
      addBlock();
      return;
    }

    if (flyZ1 > topZ1 && flyZ1 < topZ2) {
      console.log("fly z 1 w pudle");
      const newDepth = Math.abs(topZ2 - flyZ1);

      scene.remove(flyingBlock.mesh);

      let blockData = generateBlockMesh({
        depth: newDepth,
        color: flyingBlock.color,
        type: "z",
      });

      blockData.mesh.position.z = topZ2 - blockData.depth / 2;
      gameWorld.add(blockData.mesh);

      stackBlocks.push(blockData);

      gameWorld.remove(flyingBlock.mesh);
      flyingBlock.mesh.geometry.dispose();
      flyingBlock.mesh.material.dispose();
      flyingBlock = null;
      addBlock();
      return;
    } else if (flyZ2 > topZ1 && flyZ2 < topZ2) {
      console.log("fly z 2 w pudle");

      const newDepth = Math.abs(flyZ2 - topZ1);

      scene.remove(flyingBlock.mesh);

      let blockData = generateBlockMesh({
        depth: newDepth,
        color: flyingBlock.color,
        type: "z",
      });

      blockData.mesh.position.z = flyZ2 - blockData.depth / 2;
      gameWorld.add(blockData.mesh);

      stackBlocks.push(blockData);

      gameWorld.remove(flyingBlock.mesh);
      flyingBlock.mesh.geometry.dispose();
      flyingBlock.mesh.material.dispose();
      flyingBlock = null;
      addBlock();
      return;
    }
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key == " ") {
    e.preventDefault();

    checkIntersection();

    return;
  }

  if (e.key == "r") {
    e.preventDefault();
    restartGame();
    return;
  }
});

function restartGame() {
  scene.remove(gameWorld);

  gameWorld = new THREE.Object3D();
  scene.add(gameWorld);
  flyingBlock = null;
  stackBlocks = [];
  addBlock();
}

const color = 0xffffff;
const intensity = 1.5;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(2, 10, 10);
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(light.target);

// const gui = new dat.GUI();
// gui.add(leavesMaterial.normalScale, "x", 0, 5, 0.01);
// gui.add(leavesMaterial.normalScale, "y", 0, 5, 0.01);
// gui.add(light.position, "x", -15, 15).name("x light pos");
// gui.add(light.position, "y", -15, 15).name("y light pos");
// gui.add(light.position, "z", -15, 15).name("z light pos");

window.addEventListener("resize", (e) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

let lastTime = 0;

function render(time) {
  if (!time) time = 0;

  const timePassed = time - lastTime;
  lastTime = time;

  flyingBlockFrameUpdate(time, timePassed);

  renderer.render(scene, camera);
  stats.update();
  requestAnimationFrame(render);
}

render();
