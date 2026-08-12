import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebglAvailable } from "../utils/webgl";
import { useReducedMotion } from "../hooks/useReducedMotion";

const GOLD = 0xc8a45d;
const GOLD_BRIGHT = 0xe5c77a;
const FOREST = 0x0e3b2e;

function buildParticleShell(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * (0.82 + Math.random() * 0.4);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

/** Escena 3D del hero: núcleo metálico, anillos y campo de partículas con paralaje y zoom en scroll. */
export function HeroScene({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isWebglAvailable());
  }, []);

  useEffect(() => {
    const host = canvasHostRef.current;
    const sectionEl = containerRef.current;
    if (!host || !sectionEl || !supported) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const particleCount = isMobile ? 320 : 900;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    // Lighting
    scene.add(new THREE.HemisphereLight(0xf5f3ee, 0x0e3b2e, 0.55));
    const key = new THREE.DirectionalLight(GOLD_BRIGHT, 2.2);
    key.position.set(4, 5, 6);
    scene.add(key);
    const rim = new THREE.PointLight(FOREST, 3, 20);
    rim.position.set(-5, -3, -4);
    scene.add(rim);
    const fill = new THREE.PointLight(GOLD, 1.4, 20);
    fill.position.set(-3, 2, 4);
    scene.add(fill);

    // Core
    const coreGroup = new THREE.Group();
    const coreGeometry = new THREE.IcosahedronGeometry(1.35, isMobile ? 0 : 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: GOLD,
      metalness: 0.92,
      roughness: 0.22,
      emissive: new THREE.Color(GOLD),
      emissiveIntensity: 0.08,
      flatShading: !isMobile,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    coreGroup.add(core);

    // Rings
    const ringsGroup = new THREE.Group();
    const ringConfigs = [
      { radius: 2.1, tube: 0.012, rotX: Math.PI / 2.3, rotY: 0.2 },
      { radius: 2.55, tube: 0.008, rotX: Math.PI / 3.4, rotY: -0.4 },
      { radius: 3.0, tube: 0.006, rotX: Math.PI / 1.8, rotY: 0.6 },
    ];
    const ringMeshes = ringConfigs.map((cfg) => {
      const geometry = new THREE.TorusGeometry(cfg.radius, cfg.tube, 12, 120);
      const material = new THREE.MeshStandardMaterial({
        color: GOLD_BRIGHT,
        metalness: 0.9,
        roughness: 0.3,
        transparent: true,
        opacity: 0.65,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = cfg.rotX;
      mesh.rotation.y = cfg.rotY;
      mesh.userData.baseRadius = cfg.radius;
      ringsGroup.add(mesh);
      return mesh;
    });
    coreGroup.add(ringsGroup);
    scene.add(coreGroup);

    // Particle field
    const particleGeometry = new THREE.BufferGeometry();
    const positions = buildParticleShell(particleCount, 3.6);
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: GOLD_BRIGHT,
      size: isMobile ? 0.018 : 0.022,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Pointer parallax
    const pointer = { x: 0, y: 0 };
    const targetPointer = { x: 0, y: 0 };
    function handlePointerMove(e: PointerEvent) {
      const rect = host!.getBoundingClientRect();
      targetPointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    if (!reducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    // Resize handling
    function handleResize() {
      if (!host) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    }
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(host);

    let raf = 0;
    let scrollProgress = 0;
    let smoothProgress = 0;

    function updateScrollProgress() {
      const rect = sectionEl!.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const passed = vh - rect.top;
      scrollProgress = Math.min(Math.max(passed / total, 0), 1);
    }

    if (!reducedMotion) {
      window.addEventListener("scroll", updateScrollProgress, { passive: true });
    }
    updateScrollProgress();

    const startTime = performance.now();

    function animate() {
      raf = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) / 1000;

      if (!reducedMotion) {
        pointer.x += (targetPointer.x - pointer.x) * 0.04;
        pointer.y += (targetPointer.y - pointer.y) * 0.04;
        smoothProgress += (scrollProgress - smoothProgress) * 0.06;

        coreGroup.rotation.y = elapsed * 0.14 + pointer.x * 0.35;
        coreGroup.rotation.x = pointer.y * 0.22;
        particles.rotation.y = -elapsed * 0.045;
        particles.rotation.x = elapsed * 0.02;

        ringMeshes.forEach((mesh, i) => {
          const spread = 1 + smoothProgress * (0.5 + i * 0.35);
          const base = mesh.userData.baseRadius as number;
          mesh.scale.setScalar(spread);
          mesh.rotation.z = elapsed * (0.05 + i * 0.03);
          void base;
        });

        camera.position.z = 8 - smoothProgress * 3.1;
        camera.position.x = pointer.x * 0.25;
        camera.position.y = -pointer.y * 0.18 + smoothProgress * 0.15;
        camera.lookAt(0, 0, 0);

        core.rotation.y += 0.0015;
        particleMaterial.opacity = 0.55 * (1 - smoothProgress * 0.6);
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", updateScrollProgress);
      particleGeometry.dispose();
      particleMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringMeshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [supported, reducedMotion, containerRef]);

  if (!supported) {
    return <HeroSceneFallback />;
  }

  return <div ref={canvasHostRef} className="absolute inset-0" aria-hidden="true" />;
}

function HeroSceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="relative h-[60vmin] w-[60vmin] max-h-[520px] max-w-[520px]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-bright/30 via-gold/10 to-transparent blur-2xl" />
        <div className="absolute inset-[12%] animate-float rounded-full bg-gradient-to-br from-gold-bright to-gold shadow-[0_0_120px_-20px_rgba(229,199,122,0.65)]" />
        <div className="absolute inset-0 rounded-full border border-gold/30" />
        <div className="absolute inset-[8%] rounded-full border border-gold/20" style={{ transform: "rotate(20deg)" }} />
        <div className="absolute inset-[-6%] rounded-full border border-gold/10" style={{ transform: "rotate(-12deg)" }} />
      </div>
    </div>
  );
}
