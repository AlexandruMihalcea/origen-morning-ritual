import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const move = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role=button]"));
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      setPos({ x: current.x, y: current.y });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:block"
      style={{
        width: hover ? 28 : 8,
        height: hover ? 28 : 8,
        background: "var(--primary)",
        transform: `translate(${pos.x - (hover ? 14 : 4)}px, ${pos.y - (hover ? 14 : 4)}px)`,
        transition: "width 200ms ease, height 200ms ease, opacity 200ms",
        opacity: hover ? 0.4 : 0.85,
        mixBlendMode: "difference",
      }}
    />
  );
}