import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isWebglAvailable } from "../utils/webgl";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { chartShape, coinShape, fibonacciSphere, shieldShape } from "./particleShapes";

const GOLD_BRIGHT = 0xe5c77a;
const GOLD = 0xc8a45d;

export type MorphStage = 0 | 1 | 2 | 3;

type ParticleMorphProps = {
  outerRef: React.RefObject<HTMLDivElement | null>;
  onStageChange?: (stage: MorphStage) => void;
};

function lerpArray(a: Float32Array, b: Float32Array, t: number, out: Float32Array) {
  for (let i = 0; i < out.length; i++) {
    out[i] = a[i] + (b[i] - a[i]) * t;
  }
}

export function ParticleMorph({ outerRef, onStageChange }: ParticleMorphProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(isWebglAvailable());
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const outer = outerRef.current;
    if (!host || !outer || !supported) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? 900 : 2200;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light = new THREE.PointLight(GOLD_BRIGHT, 2, 20);
    light.position.set(3, 3, 5);
    scene.add(light);

    const shapes = [
      fibonacciSphere(count, 2.1),
      coinShape(count, 4.2),
      chartShape(count, 4.2),
      shieldShape(count, 4.0),
    ];

    const current = new Float32Array(count * 3);
    current.set(shapes[0]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(current, 3));
    const material = new THREE.PointsMaterial({
      color: GOLD,
      size: isMobile ? 0.028 : 0.024,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function handleResize() {
      if (!host) return;
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    }
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(host);

    let raf = 0;
    let rawProgress = 0;
    let smooth = 0;
    let lastStage: MorphStage = 0;

    function updateProgress() {
      const rect = outer!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      rawProgress = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
    }
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const startTime = performance.now();

    function animate() {
      raf = requestAnimationFrame(animate);
      smooth += (rawProgress - smooth) * (reducedMotion ? 1 : 0.09);

      const segments = shapes.length - 1;
      const scaled = smooth * segments;
      const idx = Math.min(Math.floor(scaled), segments - 1);
      const t = scaled - idx;

      lerpArray(shapes[idx], shapes[idx + 1], t, current);
      posAttr.needsUpdate = true;

      const stage = Math.min(Math.round(smooth * segments), segments) as MorphStage;
      if (stage !== lastStage) {
        lastStage = stage;
        onStageChange?.(stage);
      }

      if (!reducedMotion) {
        const elapsed = (performance.now() - startTime) / 1000;
        points.rotation.y = elapsed * 0.06;
      }

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateProgress);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported, outerRef]);

  if (!supported) {
    return (
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="h-56 w-56 animate-pulse-soft rounded-full bg-gradient-to-br from-gold-bright/40 to-gold/10 blur-xl" />
      </div>
    );
  }

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}
