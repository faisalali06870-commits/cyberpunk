import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// POSTPROCESSING IMPORTS
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import gsap from 'gsap';
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll();

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 8;

// Renderer setup
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// HDRI background/environment
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/clarens_night_02_1k.hdr',
  function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
    // scene.background = texture;
  },
  undefined,
  function (error) {
    console.error('Error loading HDRI:', error);
  }
);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1));
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load GLTF model
const loader = new GLTFLoader();
let model;
loader.load(
  './DamagedHelmet.gltf',
  (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(2, 2, 2);
    scene.add(model);
  },
  undefined,
  (error) => {
    console.error('Error loading GLTF model:', error);
  }
);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// --- Postprocessing: EffectComposer ---
const composer = new EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);

// Render pass (renders the scene)
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

// RGB Shift pass
const rgbShiftPass = new ShaderPass(RGBShiftShader);
rgbShiftPass.uniforms['amount'].value = 0.0015;   // Adjust to taste
composer.addPass(rgbShiftPass);

// Responsive resize
window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();

  renderer.setSize(w, h);
  composer.setSize(w, h);
});

window.addEventListener("mousemove",(e)=>{
  if (model){
    const rotationX = (e.clientX / window.innerWidth - .5)* (Math.PI * .12);
    const rotationY = (e.clientY / window.innerHeight - .5)* (Math.PI * .12);
    gsap.to(model.rotation, {
      y: rotationX,
      x: rotationY,
      duration: 0.5,
      ease: "power3.out"
    });
  }
  
})
window.addEventListener("resize",()=>{
  camera.aspect=window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
  composer.setSize(window.innerWidth,window.innerHeight);
})

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  composer.render();
}

animate();