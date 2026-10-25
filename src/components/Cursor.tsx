import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const frameRef = useRef<number>(0);
  const isHovering = useRef(false);
  const isClicking = useRef(false);

  useEffect(() => {
    // Keep native cursor intact - do not suppress system mouse pointer

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Trail particles for subtle luxury feel
    const trails: HTMLDivElement[] = [];
    const trailPos: { x: number; y: number }[] = [];
    for (let i = 0; i < 4; i++) {
      const t = document.createElement('div');
      const size = 6 - i * 0.9;
      t.style.cssText = `
        position: fixed; top: 0; left: 0;
        width: ${size}px; height: ${size}px; border-radius: 50%;
        pointer-events: none; z-index: 2147483645; opacity: 0;
        background: #e28b27;
        transform: translate(-50%, -50%);
        will-change: transform;
        transition: opacity 0.15s ease;
      `;
      document.body.appendChild(t);
      trails.push(t);
      trailPos.push({ x: -200, y: -200 });
    }

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => {
      isClicking.current = true;
    };
    const onUp = () => {
      isClicking.current = false;
    };

    // Instant event delegation ensures hover works immediately in all dynamically opened modals & windows
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest(
          'a, button, [role="button"], input, textarea, label, select, .plant-card, [tabindex], .btn-cancel, .modal-close-btn, .feature-card, .btn-amber'
        )
      ) {
        isHovering.current = true;
      } else {
        isHovering.current = false;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    const loop = () => {
      const { x, y } = posRef.current;

      ringPos.current.x += (x - ringPos.current.x) * 0.12;
      ringPos.current.y += (y - ringPos.current.y) * 0.12;

      trails.forEach((t, i) => {
        const lag = (i + 1) * 0.12;
        trailPos[i].x += (x - trailPos[i].x) * lag;
        trailPos[i].y += (y - trailPos[i].y) * lag;
        t.style.transform = `translate(${trailPos[i].x}px, ${trailPos[i].y}px) translate(-50%, -50%)`;
        t.style.opacity = isHovering.current ? String(Math.max(0.1, 0.5 - i * 0.1)) : '0';
      });

      if (dot) {
        dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        const sz = isClicking.current ? '6px' : isHovering.current ? '12px' : '9px';
        dot.style.width = sz;
        dot.style.height = sz;
        dot.style.background = isHovering.current
          ? 'radial-gradient(circle, #fff8e7, #e28b27)'
          : '#e28b27';
        dot.style.boxShadow = isHovering.current
          ? '0 0 0 2px rgba(226,139,39,0.3), 0 0 16px rgba(226,139,39,0.6)'
          : '0 0 0 1.5px rgba(255,255,255,0.4)';
      }

      if (ring) {
        ring.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
        const rSz = isClicking.current ? '26px' : isHovering.current ? '56px' : '36px';
        ring.style.width = rSz;
        ring.style.height = rSz;
        if (isHovering.current) {
          ring.style.borderColor = '#e28b27';
          ring.style.background = 'rgba(226,139,39,0.08)';
          ring.style.boxShadow = '0 0 20px rgba(226,139,39,0.3)';
        } else {
          ring.style.borderColor = 'rgba(255,255,255,0.6)';
          ring.style.background = 'transparent';
          ring.style.boxShadow = '0 0 0 1px rgba(7,59,36,0.2)';
        }
      }

      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      trails.forEach(t => t.remove());
    };
  }, []);

  return (
    <>
      <div
        id="custom-cursor-dot"
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '9px',
          height: '9px',
          borderRadius: '50%',
          background: '#e28b27',
          boxShadow: '0 0 0 1.5px rgba(255,255,255,0.4)',
          pointerEvents: 'none',
          zIndex: 2147483647,
          transition: 'width 0.18s ease, height 0.18s ease, background 0.18s ease, box-shadow 0.2s ease',
          willChange: 'transform',
        }}
      />
      <div
        id="custom-cursor-ring"
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.6)',
          pointerEvents: 'none',
          zIndex: 2147483646,
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, background 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
