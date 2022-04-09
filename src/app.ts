import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  Texture,
  MeshBasicMaterial,
  BackSide,
  BoxGeometry,
  Mesh,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas: HTMLCanvasElement = document.querySelector(
  "#canvas"
) as HTMLCanvasElement;

// Scene
const scene: Scene = new Scene();

// Camera
const sizes: { width: number; height: number } = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const fov: number = 45;
const aspect: number = sizes.width / sizes.height;
const near: number = 0.1;
const far: number = 1000;

const camera: PerspectiveCamera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 25);

scene.add(camera);

// Controls
const controls: OrbitControls = new OrbitControls(camera, canvas);
controls.minDistance = 10;
controls.maxDistance = 40;

// Texture
const textureLoader: TextureLoader = new TextureLoader().setPath(
  "https://raw.githubusercontent.com/EnayetHossain/3d-world/master/public/model/MarriottMadisonWest/"
);
const textureArray: MeshBasicMaterial[] = [];

["front", "back", "top", "bottom", "left", "right"].forEach((side) => {
  const texture: Texture = textureLoader.load(`${side}.jpg`);
  textureArray.push(new MeshBasicMaterial({ map: texture }));
});

textureArray.forEach((_, index) => {
  textureArray[index].side = BackSide;
});

// Cube
const cubeGeometry: BoxGeometry = new BoxGeometry(100, 100, 100);
const cube: Mesh = new Mesh(cubeGeometry, textureArray);
scene.add(cube);

// Renderer
const renderer: WebGLRenderer = new WebGLRenderer({ canvas, antialias: true });

renderer.setSize(sizes.width, sizes.height);

window.addEventListener(
  "resize",
  () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    render();
  },
  false
);

// Render
function render() {
  renderer.render(scene, camera);
}

render();

function animate() {
  requestAnimationFrame(animate);
  render();
}

animate();
