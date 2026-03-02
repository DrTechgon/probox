'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const ORANGE = [249, 115, 22];
const BLUE = [59, 130, 246];
const WHITE = [255, 255, 255];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(c1, c2, t) {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t)),
  ];
}

function drawStrandCurve(ctx, points, color1, color2, globalOpacity, lineWidth) {
  if (points.length < 2) return;
  for (let i = 0; i < points.length - 1; i++) {
    const p = points[i];
    const pNext = points[i + 1];
    const t = i / (points.length - 1);
    const depthFactor = (p.z + 1) / 2;
    const fadeMult = 1 - Math.pow(Math.abs(t - 0.5) * 2, 1.5);
    if (fadeMult <= 0) continue;

    const alpha = Math.max(0, (0.08 + depthFactor * 0.35) * globalOpacity * fadeMult);
    const color = lerpColor(color1, color2, t);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(pNext.x, pNext.y);
    ctx.strokeStyle = `rgba(${color.join(',')}, ${alpha})`;
    ctx.lineWidth = lineWidth * (0.4 + depthFactor * 0.6);
    ctx.stroke();
  }
}

function drawDiagonalHelix(ctx, x1, y1, x2, y2, phase, config) {
  const {
    rungs = 40,
    amplitude = 50,
    dotSize = 6,
    glowSize = 22,
    strandColor1 = ORANGE,
    strandColor2 = BLUE,
    globalOpacity = 1,
  } = config;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / length;
  const ny = dx / length;

  const dots = [];
  const rungLines = [];
  const strand1Points = [];
  const strand2Points = [];

  const detail = rungs * 4;
  for (let i = 0; i <= detail; i++) {
    const t = i / detail;
    const cx = lerp(x1, x2, t);
    const cy = lerp(y1, y2, t);
    const angle = phase + t * Math.PI * 5;
    const sinVal = Math.sin(angle);
    const cosVal = Math.cos(angle);
    const ax = cx + nx * sinVal * amplitude;
    const ay = cy + ny * sinVal * amplitude;
    const bx = cx - nx * sinVal * amplitude;
    const by = cy - ny * sinVal * amplitude;
    strand1Points.push({ x: ax, y: ay, z: cosVal, t });
    strand2Points.push({ x: bx, y: by, z: -cosVal, t });
  }

  for (let i = 0; i <= rungs; i++) {
    const t = i / rungs;
    const cx = lerp(x1, x2, t);
    const cy = lerp(y1, y2, t);
    const angle = phase + t * Math.PI * 5;
    const sinVal = Math.sin(angle);
    const cosVal = Math.cos(angle);
    const offsetX = nx * sinVal * amplitude;
    const offsetY = ny * sinVal * amplitude;
    const ax = cx + offsetX;
    const ay = cy + offsetY;
    const bx = cx - offsetX;
    const by = cy - offsetY;

    dots.push({ x: ax, y: ay, z: cosVal, strand: 0, t });
    dots.push({ x: bx, y: by, z: -cosVal, strand: 1, t });
    rungLines.push({ x1: ax, y1: ay, x2: bx, y2: by, z1: cosVal, z2: -cosVal, t });
  }

  drawStrandCurve(ctx, strand1Points, strandColor1, strandColor2, globalOpacity * 0.7, 2.5);
  drawStrandCurve(ctx, strand2Points, strandColor2, strandColor1, globalOpacity * 0.7, 2.5);

  for (const r of rungLines) {
    const avgZ = (r.z1 + r.z2) / 2;
    const fadeMult = 1 - Math.pow(Math.abs(r.t - 0.5) * 2, 1.5);
    const rungAlpha = Math.max(0, (0.03 + (avgZ + 1) * 0.05) * globalOpacity * fadeMult);

    ctx.beginPath();
    ctx.moveTo(r.x1, r.y1);
    ctx.lineTo(r.x2, r.y2);
    const grad = ctx.createLinearGradient(r.x1, r.y1, r.x2, r.y2);
    grad.addColorStop(0, `rgba(${strandColor1.join(',')}, ${rungAlpha})`);
    grad.addColorStop(0.5, `rgba(${WHITE.join(',')}, ${rungAlpha * 0.4})`);
    grad.addColorStop(1, `rgba(${strandColor2.join(',')}, ${rungAlpha})`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  dots.sort((a, b) => a.z - b.z);

  for (const dot of dots) {
    const depthFactor = (dot.z + 1) / 2;
    const fadeMult = 1 - Math.pow(Math.abs(dot.t - 0.5) * 2, 1.3);
    if (fadeMult <= 0) continue;

    const size = dotSize * (0.3 + depthFactor * 0.7);
    const opacity = Math.max(0, (0.1 + depthFactor * 0.9) * globalOpacity * fadeMult);
    const color = dot.strand === 0 ? strandColor1 : strandColor2;

    const gr = glowSize * (0.5 + depthFactor * 0.7);
    const glow = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, gr);
    glow.addColorStop(0, `rgba(${color.join(',')}, ${opacity * 0.35})`);
    glow.addColorStop(0.3, `rgba(${color.join(',')}, ${opacity * 0.1})`);
    glow.addColorStop(1, `rgba(${color.join(',')}, 0)`);
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, gr, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
    const dotGrad = ctx.createRadialGradient(
      dot.x - size * 0.3, dot.y - size * 0.3, 0,
      dot.x, dot.y, size
    );
    dotGrad.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`);
    dotGrad.addColorStop(0.35, `rgba(${color.join(',')}, ${opacity})`);
    dotGrad.addColorStop(1, `rgba(${color.join(',')}, ${opacity * 0.5})`);
    ctx.fillStyle = dotGrad;
    ctx.fill();
  }
}

function drawAmbientParticles(ctx, w, h, phase, particles) {
  for (const p of particles) {
    const x = p.x * w + Math.sin(phase * p.speed + p.offset) * 30;
    const y = p.y * h + Math.cos(phase * p.speed * 0.7 + p.offset) * 20;
    const pulse = 0.3 + Math.sin(phase * 2 + p.offset) * 0.2;
    const color = p.color;

    const glow = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
    glow.addColorStop(0, `rgba(${color.join(',')}, ${pulse * 0.3})`);
    glow.addColorStop(1, `rgba(${color.join(',')}, 0)`);
    ctx.beginPath();
    ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x, y, p.size * pulse, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${color.join(',')}, ${pulse * 0.6})`;
    ctx.fill();
  }
}

function drawCenterGlow(ctx, cx, cy, spread) {
  const r = spread * 0.6;
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  glow.addColorStop(0, 'rgba(249, 115, 22, 0.1)');
  glow.addColorStop(0.3, 'rgba(59, 130, 246, 0.05)');
  glow.addColorStop(0.6, 'rgba(249, 115, 22, 0.02)');
  glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();
}

function drawVignette(ctx, w, h) {
  const edgeGrad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.75);
  edgeGrad.addColorStop(0, 'rgba(15, 23, 42, 0)');
  edgeGrad.addColorStop(1, 'rgba(15, 23, 42, 0.4)');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, 0, w, h);
}

function generateParticles() {
  const particles = [];
  for (let i = 0; i < 25; i++) {
    particles.push({
      x: Math.random(),
      y: Math.random(),
      size: 1.5 + Math.random() * 2,
      speed: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? ORANGE : BLUE,
    });
  }
  return particles;
}

export default function GlobalMapBg() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const phaseRef = useRef(0);
  const particlesRef = useRef(null);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!particlesRef.current) {
      particlesRef.current = generateParticles();
    }

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    phaseRef.current += 0.008;
    const phase = phaseRef.current;

    const cx = w * 0.5;
    const cy = h * 0.5;
    const spread = Math.min(w, h) * 0.48;

    drawAmbientParticles(ctx, w, h, phase, particlesRef.current);

    drawCenterGlow(ctx, cx, cy, spread);

    drawDiagonalHelix(
      ctx,
      cx - spread * 0.92, cy - spread * 1.0,
      cx + spread * 0.92, cy + spread * 1.0,
      phase,
      {
        rungs: 40,
        amplitude: spread * 0.12,
        dotSize: 6,
        glowSize: 24,
        strandColor1: ORANGE,
        strandColor2: BLUE,
        globalOpacity: 1,
      }
    );

    drawDiagonalHelix(
      ctx,
      cx + spread * 0.92, cy - spread * 1.0,
      cx - spread * 0.92, cy + spread * 1.0,
      phase + Math.PI * 0.5,
      {
        rungs: 40,
        amplitude: spread * 0.12,
        dotSize: 6,
        glowSize: 24,
        strandColor1: BLUE,
        strandColor2: ORANGE,
        globalOpacity: 1,
      }
    );

    drawVignette(ctx, w, h);

    animRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(render);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [render]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      <motion.div
        className="absolute inset-0 bg-slate-950"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
    </div>
  );
}
