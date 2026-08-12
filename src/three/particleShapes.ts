/** Genera posiciones 3D para las formas que morfean en la escena de partículas. */

export function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

type DrawFn = (ctx: CanvasRenderingContext2D, size: number) => void;

/** Rasteriza una silueta 2D y muestrea puntos dentro de ella para formar una nube de partículas plana. */
function sampleSilhouette(draw: DrawFn, count: number, worldSize: number, depthJitter: number): Float32Array {
  const canvasSize = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvasSize, canvasSize);
  draw(ctx, canvasSize);
  const { data } = ctx.getImageData(0, 0, canvasSize, canvasSize);

  const validPixels: number[] = [];
  for (let y = 0; y < canvasSize; y++) {
    for (let x = 0; x < canvasSize; x++) {
      const alpha = data[(y * canvasSize + x) * 4 + 3];
      if (alpha > 120) validPixels.push(x, y);
    }
  }

  const positions = new Float32Array(count * 3);
  const scale = worldSize / canvasSize;
  for (let i = 0; i < count; i++) {
    const pick = Math.floor(Math.random() * (validPixels.length / 2)) * 2;
    const px = validPixels[pick] ?? canvasSize / 2;
    const py = validPixels[pick + 1] ?? canvasSize / 2;
    positions[i * 3] = (px - canvasSize / 2) * scale;
    positions[i * 3 + 1] = (canvasSize / 2 - py) * scale;
    positions[i * 3 + 2] = (Math.random() - 0.5) * depthJitter;
  }
  return positions;
}

export function coinShape(count: number, worldSize: number): Float32Array {
  return sampleSilhouette(
    (ctx, size) => {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size * 0.36, 0, Math.PI * 2);
      ctx.fill();
      // Detalle: anillo interior removido para variar densidad
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size * 0.27, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size * 0.18, 0, Math.PI * 2);
      ctx.fill();
    },
    count,
    worldSize,
    0.35
  );
}

export function chartShape(count: number, worldSize: number): Float32Array {
  return sampleSilhouette(
    (ctx, size) => {
      ctx.fillStyle = "#fff";
      const bars = 5;
      const gap = size * 0.045;
      const barWidth = (size * 0.72) / bars - gap;
      const baseY = size * 0.82;
      const startX = size * 0.14;
      const heights = [0.22, 0.36, 0.5, 0.66, 0.84];
      heights.forEach((h, i) => {
        const barHeight = size * 0.62 * h;
        const x = startX + i * (barWidth + gap);
        ctx.fillRect(x, baseY - barHeight, barWidth, barHeight);
      });
    },
    count,
    worldSize,
    0.3
  );
}

export function shieldShape(count: number, worldSize: number): Float32Array {
  return sampleSilhouette(
    (ctx, size) => {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      const cx = size / 2;
      const top = size * 0.14;
      const w = size * 0.34;
      ctx.moveTo(cx, top);
      ctx.bezierCurveTo(cx + w, top, cx + w, size * 0.4, cx + w, size * 0.46);
      ctx.bezierCurveTo(cx + w, size * 0.68, cx + w * 0.5, size * 0.82, cx, size * 0.9);
      ctx.bezierCurveTo(cx - w * 0.5, size * 0.82, cx - w, size * 0.68, cx - w, size * 0.46);
      ctx.bezierCurveTo(cx - w, size * 0.4, cx - w, top, cx, top);
      ctx.closePath();
      ctx.fill();
    },
    count,
    worldSize,
    0.32
  );
}
