"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

// Every cat is a jelly toy standing on the floor.
// Pull up to stretch, push down to squash, drag sideways to lean, tap to boop.
// The two edge cats are cropped where they meet the page edge, so they
// stay planted and never hop. `lean` caps the skew in degrees.
const cats = [
  { id: "tabby", src: "/footer/tabby.webp", alt: site.cats.tabby, lean: 6, jumps: false, origin: "0% 100%" },
  { id: "roller", src: "/footer/roller.webp", alt: site.cats.roller, lean: 6, jumps: true, origin: "50% 100%" },
  { id: "kitten", src: "/footer/kitten.webp", alt: site.cats.kitten, lean: 12, jumps: true, origin: "50% 100%" },
  { id: "loaf", src: "/footer/loaf.webp", alt: site.cats.loaf, lean: 8, jumps: true, origin: "50% 100%" },
  { id: "sitter", src: "/footer/sitter.webp", alt: site.cats.sitter, lean: 10, jumps: true, origin: "50% 100%" },
  { id: "charm", src: "/footer/charm.webp", alt: site.cats.charm, lean: 9, jumps: true, origin: "50% 100%" },
  { id: "box", src: "/footer/box.webp", alt: site.cats.box, lean: 9, jumps: true, origin: "50% 100%" },
  { id: "pair", src: "/footer/pair.webp", alt: site.cats.pair, lean: 5, jumps: false, origin: "100% 100%" },
] as const;

type Body = {
  grow: number; growV: number; // pop out of the floor on first view
  s: number; sV: number; // vertical stretch, 1 = rest
  k: number; kV: number; // lean (skewX) in degrees
  y: number; vy: number; // height above the floor in px (negative = up)
  air: boolean;
  goalS: number; goalK: number;
  hover: boolean;
  phase: number;
};

const G = 2800; // gravity, px/s²
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function CatToys() {
  const stage = useRef<HTMLDivElement>(null);
  const outer = useRef<(HTMLButtonElement | null)[]>([]);
  const inner = useRef<(HTMLSpanElement | null)[]>([]);
  const bodies = useRef<Body[]>(
    cats.map((_, i) => ({
      grow: 0, growV: 0, s: 1, sV: 0, k: 0, kV: 0, y: 0, vy: 0,
      air: false, goalS: 1, goalK: 0, hover: false, phase: i * 1.7,
    }))
  );
  const drag = useRef<{ i: number; x: number; y: number; h: number; moved: boolean } | null>(null);
  const born = useRef<number[]>(cats.map(() => Infinity));
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const calm = useRef(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    calm.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    let running = false;

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      const t = now / 1000;
      const quiet = calm.current;
      const p = pointer.current;
      const top = el.getBoundingClientRect().top;

      bodies.current.forEach((b, i) => {
        const held = drag.current?.i === i;
        const node = outer.current[i];

        // They lean a little toward the cursor, as if watching it.
        let gaze = 0;
        if (p && node && !held && !quiet && p.y > top - 500) {
          const r = node.getBoundingClientRect();
          gaze = -clamp((p.x - (r.left + r.width / 2)) / 500, -1, 1) * Math.min(3, cats[i].lean / 2);
        }

        const stiff = held ? 900 : 280;
        const damp = quiet ? 2 * Math.sqrt(stiff) : held ? 50 : 9;
        const breathe = quiet || held ? 0 : Math.sin(t * 2 + b.phase) * 0.008;
        // Airborne cats stretch on the way up and tuck on the way down.
        const flight = b.air ? clamp(-b.vy / 7000, -0.08, 0.18) : 0;
        const goalS = held ? b.goalS : (b.hover ? 1.035 : 1) + breathe + flight;
        const goalK = held ? b.goalK : gaze;
        const goalG = now >= born.current[i] ? 1 : 0;

        for (let n = 0, h = dt / 4; n < 4; n++) {
          b.sV += (stiff * (goalS - b.s) - damp * b.sV) * h;
          b.s += b.sV * h;
          b.kV += (stiff * (goalK - b.k) - damp * b.kV) * h;
          b.k += b.kV * h;
          b.growV += (170 * (goalG - b.grow) - (quiet ? 26 : 11) * b.growV) * h;
          b.grow += b.growV * h;

          if (b.air) {
            b.vy += G * h;
            b.y += b.vy * h;
            if (b.y >= 0 && b.vy > 0) {
              b.y = 0;
              b.sV -= Math.min(9, b.vy / 160); // land with a squash
              if (b.vy > 700) b.vy *= -0.28; // and a little bounce
              else {
                b.vy = 0;
                b.air = false;
              }
            }
          }
        }

        const s = clamp(b.s, 0.55, 1.7);
        const g = Math.max(0, b.grow);
        if (node) node.style.transform = `translateY(${b.y.toFixed(1)}px)`;
        const body = inner.current[i];
        if (body) body.style.transform = `skewX(${b.k.toFixed(2)}deg) scale(${(g / Math.sqrt(s)).toFixed(4)}, ${(g * s).toFixed(4)})`;
      });

      if (running) raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const now = performance.now();
          // First view: the cats pop up one after another.
          born.current = born.current.map((b, i) => (b === Infinity ? now + (calm.current ? 0 : 120 + i * 120) : b));
          start();
        } else stop();
      },
      { threshold: 0.2 }
    );
    io.observe(el);

    const track = (e: PointerEvent) => {
      pointer.current = e.pointerType === "mouse" ? { x: e.clientX, y: e.clientY } : null;
    };
    window.addEventListener("pointermove", track, { passive: true });

    return () => {
      io.disconnect();
      stop();
      window.removeEventListener("pointermove", track);
    };
  }, []);

  const launch = (i: number, v: number) => {
    const b = bodies.current[i];
    if (!cats[i].jumps || calm.current) {
      b.sV -= v / 300;
      return;
    }
    b.air = true;
    b.vy = -v;
  };

  const boop = (i: number) => {
    const b = bodies.current[i];
    b.sV -= 5.5;
    b.kV += (Math.random() - 0.5) * 60;
    if (!b.air) launch(i, 520);
  };

  // Cats overlap, so a grab goes to the topmost cat whose pixels are under
  // the pointer, not to whichever bounding box happens to be on top.
  const masks = useRef<(ImageData | null)[]>(cats.map(() => null));
  const learn = (i: number, img: HTMLImageElement) => {
    const w = 96, h = Math.max(1, Math.round((w * img.naturalHeight) / img.naturalWidth));
    const c = document.createElement("canvas");
    c.width = w; c.height = h;
    const g = c.getContext("2d", { willReadFrequently: true });
    if (!g) return;
    g.drawImage(img, 0, 0, w, h);
    masks.current[i] = g.getImageData(0, 0, w, h);
  };
  const hit = (x: number, y: number) => {
    let best = -1, bz = -Infinity;
    outer.current.forEach((n, i) => {
      const img = n?.querySelector("img");
      const m = masks.current[i];
      if (!n || !img || !m) return;
      const r = img.getBoundingClientRect();
      if (x < r.left || x > r.right || y < r.top || y > r.bottom) return;
      const px = Math.floor(((x - r.left) / r.width) * m.width), py = Math.floor(((y - r.top) / r.height) * m.height);
      if (m.data[(py * m.width + px) * 4 + 3] < 60) return;
      const z = +getComputedStyle(n).zIndex || 0;
      if (z >= bz) { bz = z; best = i; }
    });
    return best;
  };
  const hovered = useRef(-1);
  const setHover = (i: number) => {
    if (hovered.current === i) return;
    if (hovered.current >= 0) bodies.current[hovered.current].hover = false;
    if (i >= 0) bodies.current[i].hover = true;
    hovered.current = i;
    if (stage.current) stage.current.style.cursor = i >= 0 ? (drag.current ? "grabbing" : "grab") : "";
  };

  const down = (e: React.PointerEvent<HTMLDivElement>) => {
    const i = hit(e.clientX, e.clientY);
    if (i < 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
    const b = bodies.current[i];
    const h = (outer.current[i]?.getBoundingClientRect().height || 200) / b.s;
    drag.current = { i, x: e.clientX, y: e.clientY, h, moved: false };
    b.goalS = b.s;
    b.goalK = b.k;
    setHover(i);
  };

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) {
      if (e.pointerType === "mouse") setHover(hit(e.clientX, e.clientY));
      return;
    }
    const i = d.i;
    const dx = e.clientX - d.x;
    const dy = d.y - e.clientY;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    // Rubber band: easy at first, firmer the further you pull.
    const b = bodies.current[i];
    b.goalS = dy > 0 ? 1 + (0.6 * dy) / (d.h * 0.7 + dy) : 1 - (0.4 * -dy) / (d.h * 0.5 - dy);
    const lean = (-Math.atan(dx / d.h) * 180) / Math.PI;
    b.goalK = cats[i].lean * Math.tanh(lean / cats[i].lean / 1.4);
  };

  const up = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    if (!d.moved) boop(d.i);
  };

  return (
    <div
      className="toys"
      ref={stage}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={() => !drag.current && setHover(-1)}
    >
      {cats.map((c, i) => (
        <button
          key={c.id}
          type="button"
          className={`toy toy-${c.id}`}
          ref={(n) => {
            outer.current[i] = n;
          }}
          aria-label={`Boop: ${c.alt}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              boop(i);
            }
          }}
        >
          <span
            className="toy-body"
            style={{ transformOrigin: c.origin }}
            ref={(n) => {
              inner.current[i] = n;
            }}
          >
            <img
              src={c.src}
              alt=""
              draggable={false}
              onLoad={(e) => learn(i, e.currentTarget)}
              ref={(n) => {
                if (n?.complete && n.naturalWidth && !masks.current[i]) learn(i, n);
              }}
            />
          </span>
        </button>
      ))}
    </div>
  );
}
