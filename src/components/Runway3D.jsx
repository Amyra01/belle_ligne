import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Play, Pause, Eye, RotateCw, Sparkles, Volume2, VolumeX, 
  ChevronRight, Shirt, Compass, Sliders, Camera, Maximize2, RefreshCw,
  Bookmark, Check, AlertCircle, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RUNWAY_OUTFITS } from '../data/magazineData';

export default function Runway3D({ isMusicPlaying, toggleMusic, onSaveLook, savedLooks = [] }) {
  const mountRef = useRef(null);
  const [selectedOutfitIndex, setSelectedOutfitIndex] = useState(0);
  const [activeGender, setActiveGender] = useState('female'); // 'female' | 'male'
  const [cameraMode, setCameraMode] = useState('tracking'); // 'tracking', 'front-row', 'side', 'closeup', 'orbit'
  const [walkSpeed, setWalkSpeed] = useState(1.0);
  const [isPaused, setIsPaused] = useState(false);
  const [flashesActive, setFlashesActive] = useState(true);
  const [activePin, setActivePin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(25);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
  const [lookSavedToast, setLookSavedToast] = useState(false);

  const outfit = RUNWAY_OUTFITS[selectedOutfitIndex];
  const isCurrentLookSaved = savedLooks.includes(outfit.id);

  // Three.js instances ref
  const threeRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    modelGroup: null,
    limbs: {},
    spotlights: [],
    runwayLeds: [],
    backdropMesh: null,
    flashLight: null,
    time: 0,
    walkPos: -6,
    walkDir: 1,
    isTurning: false,
    turnProgress: 0,
    currentFacingAngle: 0,
    targetFacingAngle: 0,
    outfitMeshes: []
  });

  const handleGenderChange = (gender) => {
    setActiveGender(gender);
    const firstOutfitForGender = RUNWAY_OUTFITS.findIndex(o => o.gender === gender);
    if (firstOutfitForGender !== -1) {
      setSelectedOutfitIndex(firstOutfitForGender);
    }
  };

  const triggerFinaleConfetti = () => {
    confetti({
      particleCount: 130,
      spread: 95,
      origin: { y: 0.6 },
      colors: ['#146872', '#2cb0bf', '#A65539', '#CBB279', '#ffffff']
    });
  };

  const handleSaveLookAction = () => {
    if (onSaveLook) {
      onSaveLook(outfit.id);
    }
    setLookSavedToast(true);
    setTimeout(() => setLookSavedToast(false), 2200);
  };

  // Initial Loading Simulation & Device Check
  useEffect(() => {
    // Check if device is low performance or mobile
    if (window.innerWidth < 640 && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      // Optional lite mode toggle available
    }

    const timer1 = setTimeout(() => setLoadingProgress(65), 180);
    const timer2 = setTimeout(() => setLoadingProgress(90), 380);
    const timer3 = setTimeout(() => {
      setLoadingProgress(100);
      setIsLoading(false);
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (isLowPerformanceMode) return;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.022);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 9);

    // 3. Renderer with soft shadows
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Main Overhead Follow Spotlight
    const mainSpot = new THREE.SpotLight(0xffffff, 4.2);
    mainSpot.position.set(0, 10.5, 2);
    mainSpot.angle = Math.PI / 4.8;
    mainSpot.penumbra = 0.65;
    mainSpot.decay = 1.4;
    mainSpot.distance = 28;
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 1024;
    mainSpot.shadow.mapSize.height = 1024;
    scene.add(mainSpot);

    // Dynamic Color Accent Spotlights (Left and Right)
    const leftSpot = new THREE.SpotLight(outfit.spotlightHex, 3.8);
    leftSpot.position.set(-5.5, 7.5, 0);
    leftSpot.angle = Math.PI / 3.8;
    leftSpot.penumbra = 0.85;
    scene.add(leftSpot);

    const rightSpot = new THREE.SpotLight(0xffffff, 2.9);
    rightSpot.position.set(5.5, 7.5, -2);
    rightSpot.angle = Math.PI / 3.8;
    rightSpot.penumbra = 0.85;
    scene.add(rightSpot);

    // Paparazzi Flash Light (Omni intense pulse)
    const flashLight = new THREE.PointLight(0xffffff, 0, 32);
    flashLight.position.set(0, 1.8, 6);
    scene.add(flashLight);

    // 5. Runway Ramp Platform
    const runwayWidth = 3.6;
    const runwayLength = 24;
    const runwayHeight = 0.6;

    // Platform Base
    const runwayGeo = new THREE.BoxGeometry(runwayWidth, runwayHeight, runwayLength);
    const runwayMat = new THREE.MeshStandardMaterial({
      color: 0x111318,
      roughness: 0.15,
      metalness: 0.85,
    });
    const runwayMesh = new THREE.Mesh(runwayGeo, runwayMat);
    runwayMesh.position.set(0, runwayHeight / 2, -2);
    runwayMesh.receiveShadow = true;
    scene.add(runwayMesh);

    // Glossy Mirror Runway Top Surface (Soft reflections)
    const glassTopGeo = new THREE.PlaneGeometry(runwayWidth - 0.2, runwayLength - 0.2);
    const glassTopMat = new THREE.MeshPhysicalMaterial({
      color: 0x061217,
      roughness: 0.08,
      metalness: 0.92,
      clearcoat: 1.0,
      clearcoatRoughness: 0.12,
      reflectivity: 0.9
    });
    const glassTopMesh = new THREE.Mesh(glassTopGeo, glassTopMat);
    glassTopMesh.rotation.x = -Math.PI / 2;
    glassTopMesh.position.set(0, runwayHeight + 0.01, -2);
    glassTopMesh.receiveShadow = true;
    scene.add(glassTopMesh);

    // Neon Edge Strips
    const edgeGeo = new THREE.BoxGeometry(0.08, 0.04, runwayLength);
    const edgeMatLeft = new THREE.MeshBasicMaterial({ color: outfit.spotlightHex });
    const edgeMatRight = new THREE.MeshBasicMaterial({ color: 0x4ec7d4 });

    const leftEdge = new THREE.Mesh(edgeGeo, edgeMatLeft);
    leftEdge.position.set(-runwayWidth / 2 + 0.05, runwayHeight + 0.02, -2);
    scene.add(leftEdge);

    const rightEdge = new THREE.Mesh(edgeGeo, edgeMatRight);
    rightEdge.position.set(runwayWidth / 2 - 0.05, runwayHeight + 0.02, -2);
    scene.add(rightEdge);

    // Floor around runway
    const floorGeo = new THREE.PlaneGeometry(60, 60);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.8 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Audience silhouettes
    const audienceGroup = new THREE.Group();
    for (let side = -1; side <= 1; side += 2) {
      for (let z = -12; z <= 8; z += 1.8) {
        for (let row = 1; row <= 2; row++) {
          const seatX = side * (runwayWidth / 2 + 1.2 + row * 1.1);
          const seatY = 0.4 + row * 0.4;
          const headG = new THREE.SphereGeometry(0.18, 8, 8);
          const audMat = new THREE.MeshBasicMaterial({ color: 0x151821 });
          const headM = new THREE.Mesh(headG, audMat);
          headM.position.set(seatX + (Math.random() - 0.5) * 0.2, seatY + 0.8, z);
          audienceGroup.add(headM);

          const bodyG = new THREE.CylinderGeometry(0.2, 0.25, 0.7, 8);
          const bodyM = new THREE.Mesh(bodyG, audMat);
          bodyM.position.set(seatX, seatY + 0.35, z);
          audienceGroup.add(bodyM);
        }
      }
    }
    scene.add(audienceGroup);

    // Runway Backdrop Screen with Belle Ligne Title Canvas Texture
    const backdropCanvas = document.createElement('canvas');
    backdropCanvas.width = 1024;
    backdropCanvas.height = 512;
    const bCtx = backdropCanvas.getContext('2d');
    bCtx.fillStyle = '#060B10';
    bCtx.fillRect(0, 0, 1024, 512);
    bCtx.fillStyle = '#ffffff';
    bCtx.font = 'bold 74px "Playfair Display", Georgia, serif';
    bCtx.textAlign = 'center';
    bCtx.fillText('belle ligne', 512, 190);
    bCtx.font = '22px "Plus Jakarta Sans", sans-serif';
    bCtx.fillStyle = '#2cb0bf';
    bCtx.fillText('DIGITAL FASHION WEEK 2028', 512, 260);
    bCtx.fillStyle = '#A65539';
    bCtx.font = '18px monospace';
    bCtx.fillText('SUMMER / AUTUMN-WINTER • LIVE RUNWAY', 512, 310);

    const backdropTexture = new THREE.CanvasTexture(backdropCanvas);
    const backdropGeo = new THREE.PlaneGeometry(16, 9);
    const backdropMat = new THREE.MeshBasicMaterial({ map: backdropTexture });
    const backdropMesh = new THREE.Mesh(backdropGeo, backdropMat);
    backdropMesh.position.set(0, 4.5, -13.9);
    scene.add(backdropMesh);

    // 6. BUILD HIGH FASHION ARTICULATED HUMAN 3D MODEL
    const modelGroup = new THREE.Group();
    modelGroup.position.set(0, runwayHeight, 0);
    scene.add(modelGroup);

    const limbs = buildHumanoidModel(modelGroup, outfit, activeGender);

    threeRef.current = {
      scene,
      camera,
      renderer,
      modelGroup,
      limbs,
      spotlights: [mainSpot, leftSpot, rightSpot],
      runwayLeds: [leftEdge, rightEdge],
      backdropMesh,
      flashLight,
      time: 0,
      walkPos: -6,
      walkDir: 1,
      isTurning: false,
      turnProgress: 0,
      currentFacingAngle: 0,
      targetFacingAngle: 0,
      outfitMeshes: []
    };

    mainSpot.target = modelGroup;

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Orbit Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let orbitAngles = { theta: 0, phi: 0.3 };

    const onMouseDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      orbitAngles.theta -= deltaX * 0.008;
      orbitAngles.phi = Math.max(0.05, Math.min(Math.PI / 2.2, orbitAngles.phi - deltaY * 0.008));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId;
    let lastFlashTime = 0;

    const animate = (now) => {
      animationFrameId = requestAnimationFrame(animate);

      const state = threeRef.current;
      if (!state.scene) return;

      const delta = 0.016 * walkSpeed;

      if (!isPaused) {
        state.time += delta;

        const minZ = -8.5;
        const maxZ = 6.0;

        if (state.isTurning) {
          state.turnProgress += delta * 2.2;
          const t = Math.min(1.0, state.turnProgress);
          const ease = t * t * (3 - 2 * t);
          state.currentFacingAngle = THREE.MathUtils.lerp(
            state.currentFacingAngle,
            state.targetFacingAngle,
            ease
          );
          modelGroup.rotation.y = state.currentFacingAngle;

          limbs.pelvis.position.y = 1.35 + Math.sin(state.time * 2) * 0.02;
          limbs.leftLeg.rotation.x *= 0.85;
          limbs.rightLeg.rotation.x *= 0.85;
          limbs.leftArm.rotation.x = Math.sin(state.time * 3) * 0.15;
          limbs.rightArm.rotation.x = -Math.sin(state.time * 3) * 0.15;

          if (limbs.cape) {
            limbs.cape.rotation.x = 0.2 + Math.sin(state.time * 4) * 0.1;
          }

          if (state.turnProgress >= 1.0) {
            state.isTurning = false;
            state.currentFacingAngle = state.targetFacingAngle;
            modelGroup.rotation.y = state.targetFacingAngle;
          }
        } else {
          const strideSpeed = 3.6;
          state.walkPos += state.walkDir * delta * 1.6;
          modelGroup.position.z = state.walkPos;

          if (state.walkPos >= maxZ && state.walkDir === 1) {
            state.isTurning = true;
            state.turnProgress = 0;
            state.walkDir = -1;
            state.targetFacingAngle = Math.PI;

            if (flashesActive) {
              state.flashLight.intensity = 15;
            }
          } else if (state.walkPos <= minZ && state.walkDir === -1) {
            state.isTurning = true;
            state.turnProgress = 0;
            state.walkDir = 1;
            state.targetFacingAngle = 0;
          }

          const walkCycle = state.time * strideSpeed;

          // Catwalk Kinematics
          const legSwing = Math.sin(walkCycle) * 0.55;
          limbs.leftLeg.rotation.x = legSwing;
          limbs.rightLeg.rotation.x = -legSwing;

          limbs.leftKnee.rotation.x = legSwing < 0 ? Math.abs(legSwing) * 0.85 : 0.05;
          limbs.rightKnee.rotation.x = legSwing > 0 ? Math.abs(legSwing) * 0.85 : 0.05;

          const hipSway = Math.cos(walkCycle) * (activeGender === 'female' ? 0.16 : 0.08);
          limbs.pelvis.rotation.z = hipSway;
          limbs.pelvis.rotation.y = -Math.sin(walkCycle) * 0.08;
          limbs.pelvis.position.y = 1.35 + Math.abs(Math.sin(walkCycle)) * 0.05;

          limbs.torso.rotation.z = -hipSway * 0.6;
          limbs.torso.rotation.y = Math.sin(walkCycle) * 0.06;
          limbs.head.rotation.y = -limbs.torso.rotation.y * 0.5;

          const armSwing = Math.sin(walkCycle) * 0.35;
          limbs.leftArm.rotation.x = -armSwing;
          limbs.rightArm.rotation.x = armSwing;
          limbs.leftArm.rotation.z = 0.15 + (activeGender === 'female' ? 0.08 : 0.15);
          limbs.rightArm.rotation.z = -0.15 - (activeGender === 'female' ? 0.08 : 0.15);

          if (limbs.cape) {
            limbs.cape.rotation.x = 0.25 + Math.abs(Math.sin(walkCycle)) * 0.15 + (state.walkDir === 1 ? 0.15 : -0.15);
            limbs.cape.rotation.y = Math.sin(walkCycle) * 0.08;
          }
        }
      }

      // Camera Presets
      if (cameraMode === 'tracking') {
        const targetCamZ = modelGroup.position.z + 5.5;
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.08);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.2, 0.08);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.08);
        camera.lookAt(modelGroup.position.x, modelGroup.position.y + 1.2, modelGroup.position.z);
      } else if (cameraMode === 'front-row') {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 2.6, 0.06);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.2, 0.06);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 6.8, 0.06);
        camera.lookAt(modelGroup.position.x, modelGroup.position.y + 1.4, modelGroup.position.z);
      } else if (cameraMode === 'side') {
        // High Fashion Profile Angle
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 4.2, 0.06);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.0, 0.06);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, modelGroup.position.z + 0.5, 0.08);
        camera.lookAt(modelGroup.position.x, modelGroup.position.y + 1.4, modelGroup.position.z);
      } else if (cameraMode === 'closeup') {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0.4, 0.06);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 2.1, 0.06);
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, modelGroup.position.z + 2.2, 0.08);
        camera.lookAt(modelGroup.position.x, modelGroup.position.y + 1.6, modelGroup.position.z);
      } else if (cameraMode === 'orbit') {
        const radius = 5.0;
        camera.position.x = modelGroup.position.x + radius * Math.sin(orbitAngles.theta) * Math.cos(orbitAngles.phi);
        camera.position.y = modelGroup.position.y + 1.4 + radius * Math.sin(orbitAngles.phi);
        camera.position.z = modelGroup.position.z + radius * Math.cos(orbitAngles.theta) * Math.cos(orbitAngles.phi);
        camera.lookAt(modelGroup.position.x, modelGroup.position.y + 1.3, modelGroup.position.z);
      }

      // Flash simulation
      if (flashesActive && now - lastFlashTime > 280 + Math.random() * 900) {
        lastFlashTime = now;
        const flashSide = Math.random() > 0.5 ? 1 : -1;
        state.flashLight.position.set(
          flashSide * (runwayWidth / 2 + 1.2 + Math.random() * 2),
          0.8 + Math.random() * 1.5,
          modelGroup.position.z + (Math.random() - 0.5) * 4
        );
        state.flashLight.intensity = 12 + Math.random() * 15;
      } else {
        state.flashLight.intensity *= 0.75;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer) renderer.dispose();
    };
  }, [selectedOutfitIndex, activeGender, isLowPerformanceMode]);

  useEffect(() => {
    if (!threeRef.current.scene) return;
    const { spotlights, runwayLeds } = threeRef.current;
    if (spotlights && spotlights[1]) {
      spotlights[1].color.setHex(outfit.spotlightHex);
    }
    if (runwayLeds && runwayLeds[0]) {
      runwayLeds[0].material.color.setHex(outfit.spotlightHex);
    }
  }, [selectedOutfitIndex, outfit]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-200/40 dark:border-neutral-800 bg-[#0A0C10] text-white shadow-2xl">
      
      {/* 3D SCENE LOADING SCREEN / PROGRESS */}
      {isLoading && (
        <div className="absolute inset-0 z-40 bg-[#0A0C10] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
          <div className="w-16 h-16 rounded-full border-2 border-teal-500/20 border-t-teal-400 animate-spin mb-4" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-teal-400 font-bold">
            Initializing Runway 3D Engine
          </span>
          <p className="text-xs text-neutral-400 mt-1 max-w-xs font-sans">
            Calibrating volumetric spotlights, glossy reflections, and mannequin articulation...
          </p>

          <div className="w-48 h-1.5 bg-neutral-800 rounded-full mt-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-teal-500 to-amber-400 h-full transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-neutral-500 mt-2">{loadingProgress}%</span>
        </div>
      )}

      {/* Top Runway Broadcast Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm pointer-events-auto">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-red-600/90 text-white text-xs font-semibold uppercase px-2.5 py-1 rounded-full animate-pulse tracking-wider">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            <span>Live Runway 3D</span>
          </div>
          <div className="hidden md:block text-xs tracking-widest text-neutral-300 font-sans uppercase">
            PCTE Belle Ligne Showcase • Milan/Paris Satellite
          </div>
        </div>

        {/* Top Controls: Sound, Fullscreen, Finale, Fallback Toggle */}
        <div className="flex items-center space-x-2">
          {/* Low-end device fallback toggle */}
          <button
            onClick={() => setIsLowPerformanceMode(!isLowPerformanceMode)}
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-mono border border-white/10 bg-black/40 text-neutral-400 hover:text-white"
            title="Toggle between real-time 3D and Lite video mode"
          >
            <span>{isLowPerformanceMode ? '3D Active' : 'Lite Mode'}</span>
          </button>

          <button
            onClick={toggleMusic}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isMusicPlaying
                ? 'bg-teal-600/80 border-teal-400 text-white shadow-lg shadow-teal-500/20'
                : 'bg-black/50 border-neutral-700 text-neutral-300 hover:text-white'
            }`}
            title="Toggle Catwalk Ambient Soundtrack"
          >
            {isMusicPlaying ? <Volume2 size={14} className="animate-bounce" /> : <VolumeX size={14} />}
            <span className="hidden sm:inline">{isMusicPlaying ? 'Beat Playing' : 'Runway Beat'}</span>
          </button>

          <button
            onClick={triggerFinaleConfetti}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-600/80 to-rose-600/80 hover:brightness-110 border border-amber-400/50 text-white transition-all shadow-md"
            title="Launch Grand Finale Celebration"
          >
            <Sparkles size={14} />
            <span className="hidden sm:inline">Finale FX</span>
          </button>
        </div>
      </div>

      {/* Save Look Toast Notification */}
      {lookSavedToast && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-teal-600 text-white text-xs font-semibold flex items-center space-x-2 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <Check size={14} />
          <span>Look saved to your Belle Ligne Wardrobe!</span>
        </div>
      )}

      {/* 3D Canvas or Lite Fallback View */}
      {!isLowPerformanceMode ? (
        <div 
          ref={mountRef} 
          className="w-full h-[520px] sm:h-[620px] lg:h-[680px] cursor-grab active:cursor-grabbing relative"
        />
      ) : (
        /* Lite Mode Fallback for Mobile/Low-End Devices */
        <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] flex items-center justify-center bg-black overflow-hidden">
          <img
            src={outfit.gender === 'female' ? '/images/cover_teal.jpg' : '/images/cover_nextwave.jpg'}
            alt="Runway look fallback"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute z-10 text-center p-6">
            <span className="px-3 py-1 rounded-full bg-teal-600 text-xs font-mono uppercase font-bold text-white mb-2 inline-block">
              Lite Performance Mode Active
            </span>
            <h3 className="font-editorial text-3xl font-bold text-white">{outfit.title}</h3>
            <p className="text-xs text-neutral-300 mt-1 max-w-sm mx-auto">{outfit.garmentType}</p>
            <button
              onClick={() => setIsLowPerformanceMode(false)}
              className="mt-4 px-4 py-2 rounded-full bg-white text-neutral-900 font-semibold text-xs uppercase tracking-wider"
            >
              Switch back to Interactive 3D
            </button>
          </div>
        </div>
      )}

      {/* Hotspot Floating Annotations */}
      {activePin && (
        <div className="absolute top-20 right-4 sm:right-6 z-30 max-w-xs sm:max-w-sm p-4 rounded-xl editorial-glass-dark text-white border border-teal-500/30 shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-700/60 mb-2">
            <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">{activePin.pin}</span>
            <button 
              onClick={() => setActivePin(null)}
              className="text-neutral-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <p className="text-xs text-neutral-200 leading-relaxed font-sans">{activePin.desc}</p>
          <div className="mt-2 text-[10px] text-neutral-400 uppercase tracking-wider">
            Curated by {outfit.designer}
          </div>
        </div>
      )}

      {/* Floating Outfit Spec Card & "Save This Look" Button (Left side) */}
      <div className="absolute top-16 left-4 sm:left-6 z-10 pointer-events-none hidden sm:block max-w-xs">
        <div className="p-3.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 pointer-events-auto shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-widest uppercase font-mono text-teal-400 font-semibold">
              Look #{selectedOutfitIndex + 1} • {outfit.gender === 'female' ? "Couture" : "Menswear"}
            </span>
            {/* SAVE THIS LOOK BUTTON */}
            <button
              onClick={handleSaveLookAction}
              className={`p-1.5 rounded-full border transition-all ${
                isCurrentLookSaved 
                  ? 'bg-amber-500 text-white border-amber-400 shadow-md' 
                  : 'bg-white/10 text-neutral-300 border-white/20 hover:text-white hover:bg-white/20'
              }`}
              title="Save this look to wardrobe"
            >
              <Bookmark size={13} fill={isCurrentLookSaved ? "currentColor" : "none"} />
            </button>
          </div>

          <h3 className="font-editorial text-lg text-white font-semibold leading-snug mt-1">
            {outfit.title}
          </h3>
          <p className="text-xs text-neutral-300 mt-0.5 line-clamp-2 font-light">
            {outfit.fabric}
          </p>

          {/* Quick Hotspot Buttons */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
            {outfit.details.map((detail, idx) => (
              <button
                key={idx}
                onClick={() => setActivePin(detail)}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 hover:bg-teal-600/80 hover:text-white text-neutral-300 transition-colors border border-white/10"
              >
                📍 {detail.pin}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Interactive Runway Control Deck */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black via-black/75 to-transparent backdrop-blur-sm pointer-events-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Gender & Outfit Swapper */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex p-0.5 rounded-full bg-neutral-900 border border-neutral-700">
              <button
                onClick={() => handleGenderChange('female')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeGender === 'female' 
                    ? 'bg-teal-600 text-white shadow' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                👠 Woman Ramp Walk
              </button>
              <button
                onClick={() => handleGenderChange('male')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  activeGender === 'male' 
                    ? 'bg-amber-700 text-white shadow' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                🕶️ Man Runway Walk
              </button>
            </div>

            {/* Outfits List */}
            <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
              {RUNWAY_OUTFITS.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedOutfitIndex(idx);
                    setActiveGender(item.gender);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border whitespace-nowrap transition-all ${
                    selectedOutfitIndex === idx
                      ? 'border-teal-400 bg-teal-950/80 text-white shadow-lg shadow-teal-950/50 scale-105'
                      : 'border-white/10 bg-black/40 text-neutral-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span 
                    className="inline-block w-2 h-2 rounded-full mr-1.5 align-middle"
                    style={{ backgroundColor: item.accentColor }}
                  />
                  {item.title.split(' ')[0]} {item.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Angles & Speed Controls */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
            {/* Camera Presets */}
            <div className="flex items-center space-x-1 bg-black/60 p-1 rounded-xl border border-white/10">
              <span className="text-[10px] text-neutral-400 uppercase px-1.5 hidden lg:inline font-mono">Camera:</span>
              <button
                onClick={() => setCameraMode('tracking')}
                className={`px-2 py-1 rounded-md text-[11px] transition-colors ${
                  cameraMode === 'tracking' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Cinematic Walking Follow Cam"
              >
                🎥 Walk
              </button>
              <button
                onClick={() => setCameraMode('front-row')}
                className={`px-2 py-1 rounded-md text-[11px] transition-colors ${
                  cameraMode === 'front-row' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
                title="VIP Seated Low Angle"
              >
                🪑 Front
              </button>
              <button
                onClick={() => setCameraMode('side')}
                className={`px-2 py-1 rounded-md text-[11px] transition-colors ${
                  cameraMode === 'side' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Profile Side Angle"
              >
                📐 Side
              </button>
              <button
                onClick={() => setCameraMode('closeup')}
                className={`px-2 py-1 rounded-md text-[11px] transition-colors ${
                  cameraMode === 'closeup' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Fabric & Collar Macro Detail"
              >
                🔍 Detail
              </button>
              <button
                onClick={() => setCameraMode('orbit')}
                className={`px-2 py-1 rounded-md text-[11px] transition-colors ${
                  cameraMode === 'orbit' ? 'bg-white/20 text-white font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Free 360 Drag Orbit"
              >
                🔄 360°
              </button>
            </div>

            {/* Play/Pause & Speed Slider */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                title={isPaused ? "Resume Walk" : "Pause in Pose"}
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>

              <button
                onClick={() => setFlashesActive(!flashesActive)}
                className={`p-1.5 rounded-full border transition-all ${
                  flashesActive 
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                    : 'bg-white/5 border-white/10 text-neutral-500'
                }`}
                title={flashesActive ? "Paparazzi Flashes ON" : "Paparazzi Flashes OFF"}
              >
                <Camera size={14} />
              </button>

              <button
                onClick={() => setWalkSpeed(walkSpeed === 1.0 ? 0.4 : 1.0)}
                className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
                  walkSpeed < 1.0 
                    ? 'bg-teal-500/30 border-teal-400 text-teal-300' 
                    : 'bg-white/10 border-white/10 text-neutral-300'
                }`}
                title="Toggle Slow Motion Runway Walk"
              >
                {walkSpeed < 1.0 ? '0.4x Slow' : '1.0x Strut'}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// 3D HUMANOID PROCEDURAL FASHION MANNEQUIN GENERATOR
function buildHumanoidModel(parentGroup, outfit, gender) {
  while (parentGroup.children.length > 0) {
    parentGroup.remove(parentGroup.children[0]);
  }

  const isFemale = gender === 'female';

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0xdeb887,
    roughness: 0.45,
    metalness: 0.1
  });

  const garmentColor = new THREE.Color(outfit.color);
  const accentColor = new THREE.Color(outfit.accentColor);

  const mainClothMat = new THREE.MeshPhysicalMaterial({
    color: garmentColor,
    roughness: isFemale ? 0.25 : 0.6,
    metalness: isFemale ? 0.4 : 0.2,
    clearcoat: isFemale ? 0.8 : 0.1,
    clearcoatRoughness: 0.2
  });

  const accentClothMat = new THREE.MeshStandardMaterial({
    color: accentColor,
    roughness: 0.5,
    metalness: 0.3
  });

  const pelvisGroup = new THREE.Group();
  pelvisGroup.position.y = 1.35;
  parentGroup.add(pelvisGroup);

  const hipWidth = isFemale ? 0.36 : 0.32;
  const hipGeo = new THREE.CylinderGeometry(hipWidth * 0.9, hipWidth, 0.22, 12);
  const hipMesh = new THREE.Mesh(hipGeo, mainClothMat);
  pelvisGroup.add(hipMesh);

  const torsoGroup = new THREE.Group();
  torsoGroup.position.y = 0.15;
  pelvisGroup.add(torsoGroup);

  const torsoWidth = isFemale ? 0.32 : 0.42;
  const torsoGeo = new THREE.CylinderGeometry(torsoWidth, hipWidth * 0.85, 0.42, 12);
  const torsoMesh = new THREE.Mesh(torsoGeo, mainClothMat);
  torsoMesh.position.y = 0.21;
  torsoMesh.castShadow = true;
  torsoGroup.add(torsoMesh);

  const neckGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.16, 10);
  const neckMesh = new THREE.Mesh(neckGeo, skinMat);
  neckMesh.position.y = 0.46;
  torsoGroup.add(neckMesh);

  const headGroup = new THREE.Group();
  headGroup.position.y = 0.62;
  torsoGroup.add(headGroup);

  const headGeo = new THREE.SphereGeometry(0.14, 16, 16);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headMesh.scale.set(1, 1.25, 1.1);
  headMesh.castShadow = true;
  headGroup.add(headMesh);

  if (isFemale) {
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1A1412, roughness: 0.3 });
    const hairGeo = new THREE.SphereGeometry(0.16, 14, 14);
    const hairMesh = new THREE.Mesh(hairGeo, hairMat);
    hairMesh.position.set(0, 0.06, -0.04);
    headGroup.add(hairMesh);

    const bunGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const bunMesh = new THREE.Mesh(bunGeo, hairMat);
    bunMesh.position.set(0, 0.12, -0.16);
    headGroup.add(bunMesh);
  } else {
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0
    });
    const shadeGeo = new THREE.BoxGeometry(0.24, 0.06, 0.08);
    const shadeMesh = new THREE.Mesh(shadeGeo, glassMat);
    shadeMesh.position.set(0, 0.02, 0.14);
    headGroup.add(shadeMesh);

    const hatMat = new THREE.MeshStandardMaterial({ color: 0x15161B, roughness: 0.8 });
    const crownGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.15, 16);
    const crownMesh = new THREE.Mesh(crownGeo, hatMat);
    crownMesh.position.y = 0.12;
    headGroup.add(crownMesh);

    const brimGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.02, 16);
    const brimMesh = new THREE.Mesh(brimGeo, hatMat);
    brimMesh.position.y = 0.05;
    headGroup.add(brimMesh);
  }

  let capeMesh = null;
  if (isFemale) {
    const capeGeo = new THREE.PlaneGeometry(0.7, 1.4, 8, 8);
    const capeMat = new THREE.MeshPhysicalMaterial({
      color: garmentColor,
      roughness: 0.2,
      metalness: 0.3,
      side: THREE.DoubleSide,
      clearcoat: 0.6
    });
    capeMesh = new THREE.Mesh(capeGeo, capeMat);
    capeMesh.position.set(0, 0.2, -0.16);
    capeMesh.rotation.x = 0.25;
    torsoGroup.add(capeMesh);

    const cowlGeo = new THREE.TorusGeometry(0.25, 0.08, 8, 16);
    const cowlMesh = new THREE.Mesh(cowlGeo, mainClothMat);
    cowlMesh.rotation.x = Math.PI / 2;
    cowlMesh.position.y = 0.38;
    torsoGroup.add(cowlMesh);
  } else {
    const origamiGeo = new THREE.ConeGeometry(0.22, 0.45, 3);
    origamiGeo.rotateZ(Math.PI / 6);
    const origamiMesh = new THREE.Mesh(origamiGeo, accentClothMat);
    origamiMesh.position.set(0.14, 0.28, 0.14);
    torsoGroup.add(origamiMesh);

    const strapMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9 });
    const strapGeo = new THREE.BoxGeometry(0.04, 0.46, 0.02);
    const strapLeft = new THREE.Mesh(strapGeo, strapMat);
    strapLeft.position.set(-0.12, 0.2, 0.12);
    torsoGroup.add(strapLeft);

    const strapRight = new THREE.Mesh(strapGeo, strapMat);
    strapRight.position.set(0.12, 0.2, 0.12);
    torsoGroup.add(strapRight);
  }

  const armRadius = isFemale ? 0.045 : 0.06;
  const armLength = 0.34;

  const leftArm = new THREE.Group();
  leftArm.position.set(-(torsoWidth / 2 + 0.06), 0.38, 0);
  torsoGroup.add(leftArm);

  const leftUpperArmGeo = new THREE.CylinderGeometry(armRadius, armRadius * 0.85, armLength, 8);
  const leftUpperArm = new THREE.Mesh(leftUpperArmGeo, skinMat);
  leftUpperArm.position.y = -armLength / 2;
  leftArm.add(leftUpperArm);

  const leftForearm = new THREE.Group();
  leftForearm.position.y = -armLength;
  leftArm.add(leftForearm);

  const leftForearmMesh = new THREE.Mesh(leftUpperArmGeo, skinMat);
  leftForearmMesh.position.y = -armLength / 2;
  leftForearm.add(leftForearmMesh);

  const rightArm = new THREE.Group();
  rightArm.position.set(torsoWidth / 2 + 0.06, 0.38, 0);
  torsoGroup.add(rightArm);

  const rightUpperArmGeo = new THREE.CylinderGeometry(armRadius, armRadius * 0.85, armLength, 8);
  const rightUpperArm = new THREE.Mesh(rightUpperArmGeo, skinMat);
  rightUpperArm.position.y = -armLength / 2;
  rightArm.add(rightUpperArm);

  const rightForearm = new THREE.Group();
  rightForearm.position.y = -armLength;
  rightArm.add(rightForearm);

  const rightForearmMesh = new THREE.Mesh(rightUpperArmGeo, skinMat);
  rightForearmMesh.position.y = -armLength / 2;
  rightForearm.add(rightForearmMesh);

  const legRadius = isFemale ? 0.065 : 0.09;
  const legLength = 0.65;

  const leftLeg = new THREE.Group();
  leftLeg.position.set(-hipWidth * 0.38, -0.08, 0);
  pelvisGroup.add(leftLeg);

  const thighGeo = new THREE.CylinderGeometry(legRadius, legRadius * 0.8, legLength, 10);
  const leftThighMesh = new THREE.Mesh(thighGeo, isFemale ? mainClothMat : accentClothMat);
  leftThighMesh.position.y = -legLength / 2;
  leftThighMesh.castShadow = true;
  leftLeg.add(leftThighMesh);

  const leftKnee = new THREE.Group();
  leftKnee.position.y = -legLength;
  leftLeg.add(leftKnee);

  const shinGeo = new THREE.CylinderGeometry(legRadius * 0.8, legRadius * 0.65, legLength, 10);
  const leftShinMesh = new THREE.Mesh(shinGeo, isFemale ? skinMat : mainClothMat);
  leftShinMesh.position.y = -legLength / 2;
  leftShinMesh.castShadow = true;
  leftKnee.add(leftShinMesh);

  const shoeMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.2, metalness: 0.8 });
  const footGeo = new THREE.BoxGeometry(0.08, 0.07, isFemale ? 0.16 : 0.22);
  const leftFoot = new THREE.Mesh(footGeo, shoeMat);
  leftFoot.position.set(0, -legLength, 0.04);
  leftKnee.add(leftFoot);

  const rightLeg = new THREE.Group();
  rightLeg.position.set(hipWidth * 0.38, -0.08, 0);
  pelvisGroup.add(rightLeg);

  const rightThighMesh = new THREE.Mesh(thighGeo, isFemale ? mainClothMat : accentClothMat);
  rightThighMesh.position.y = -legLength / 2;
  rightThighMesh.castShadow = true;
  rightLeg.add(rightThighMesh);

  const rightKnee = new THREE.Group();
  rightKnee.position.y = -legLength;
  rightLeg.add(rightKnee);

  const rightShinMesh = new THREE.Mesh(shinGeo, isFemale ? skinMat : mainClothMat);
  rightShinMesh.position.y = -legLength / 2;
  rightShinMesh.castShadow = true;
  rightKnee.add(rightShinMesh);

  const rightFoot = new THREE.Mesh(footGeo, shoeMat);
  rightFoot.position.set(0, -legLength, 0.04);
  rightKnee.add(rightFoot);

  if (isFemale) {
    const skirtGeo = new THREE.ConeGeometry(0.48, 1.25, 16, 1, true);
    const skirtMat = new THREE.MeshPhysicalMaterial({
      color: garmentColor,
      roughness: 0.3,
      metalness: 0.3,
      side: THREE.DoubleSide
    });
    const skirtMesh = new THREE.Mesh(skirtGeo, skirtMat);
    skirtMesh.position.y = -0.58;
    pelvisGroup.add(skirtMesh);
  } else {
    const pocketGeo = new THREE.BoxGeometry(0.06, 0.18, 0.12);
    const pocketMat = new THREE.MeshStandardMaterial({ color: 0x111215 });
    const pLeft = new THREE.Mesh(pocketGeo, pocketMat);
    pLeft.position.set(-legRadius - 0.02, -0.25, 0);
    leftLeg.add(pLeft);

    const pRight = new THREE.Mesh(pocketGeo, pocketMat);
    pRight.position.set(legRadius + 0.02, -0.25, 0);
    rightLeg.add(pRight);
  }

  return {
    pelvis: pelvisGroup,
    torso: torsoGroup,
    head: headGroup,
    cape: capeMesh,
    leftArm,
    leftForearm,
    rightArm,
    rightForearm,
    leftLeg,
    leftKnee,
    rightLeg,
    rightKnee
  };
}
