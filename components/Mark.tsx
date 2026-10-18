"use client";

import { useState } from "react";

// The hand-drawn K. Each click redraws it: three reveal strokes trace the
// stem, the arm and the long sweep, in the order it was written.
const strokes = [
  { d: "M260 66 C257 150 252 250 250 356", w: 28, dur: 0.32, delay: 0 },
  { d: "M384 74 C345 88 305 118 282 162 C266 196 256 228 252 262", w: 46, dur: 0.34, delay: 0.3 },
  {
    d: "M6 302 C70 236 150 160 230 98 C300 50 400 14 480 8 C540 6 570 30 570 80 C570 140 520 200 460 250 C410 290 360 322 330 318 C300 312 285 270 270 226",
    w: 32,
    dur: 0.95,
    delay: 0.62,
  },
];

export function Mark() {
  const [run, setRun] = useState(0);
  return (
    <button type="button" className="mark" aria-label="Keyik" onClick={() => setRun((r) => r + 1)}>
      <svg key={run} viewBox="0 0 578 365" className={run ? "draw" : undefined} aria-hidden>
        <defs>
          <filter id="mark-white">
            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
          </filter>
          <mask id="mark-ink" maskUnits="userSpaceOnUse" x="0" y="0" width="578" height="365">
            <image href="/mark.png" width="578" height="365" filter="url(#mark-white)" />
          </mask>
          <mask id="mark-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="578" height="365">
            {strokes.map((s, k) => (
              <path
                key={k}
                d={s.d}
                pathLength={1}
                fill="none"
                stroke="#fff"
                strokeWidth={s.w}
                strokeLinecap="round"
                style={{ animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}
              />
            ))}
          </mask>
        </defs>
        <g mask="url(#mark-reveal)">
          <rect width="578" height="365" fill="currentColor" mask="url(#mark-ink)" />
        </g>
      </svg>
    </button>
  );
}
