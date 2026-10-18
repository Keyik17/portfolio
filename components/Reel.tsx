"use client";

import { useEffect, useRef, useState } from "react";

type Clip = { slug: string; title: string; length: string };

const clips: Clip[] = [
  { slug: "roundtrip", title: "Roundtrip", length: "1:48" },
  { slug: "petal-glow", title: "Petal & Glow", length: "2:23" },
  { slug: "section-library", title: "Section Library", length: "2:29" },
  { slug: "nsac", title: "NSAC", length: "5:42" },
];

const src = (c: Clip, ext: string) => `/reel/${c.slug}.${ext}`;

export function Reel() {
  const [active, setActive] = useState(0);
  const [started, setStarted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const clip = clips[active];

  // Thin progress line under the active title.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const tick = () => {
      if (bar.current) bar.current.style.transform = `scaleX(${v.duration ? v.currentTime / v.duration : 0})`;
    };
    v.addEventListener("timeupdate", tick);
    return () => v.removeEventListener("timeupdate", tick);
  }, [started, active]);

  useEffect(() => {
    if (started) video.current?.play().catch(() => {});
  }, [active, started]);

  return (
    <section className="reel" aria-label="Walkthroughs">
      <div className="bar">
        <small>Walkthroughs</small>
      </div>

      <div className="reel-stage">
        {started ? (
          <video
            key={clip.slug}
            ref={video}
            src={src(clip, "mp4")}
            poster={src(clip, "webp")}
            controls
            playsInline
            preload="auto"
          />
        ) : (
          <button className="reel-poster" onClick={() => setStarted(true)} aria-label={`Play ${clip.title} walkthrough`}>
            <img src={src(clip, "webp")} alt="" />
            <span className="reel-play">
              <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden>
                <path d="M0 0l10 6-10 6z" fill="currentColor" />
              </svg>
              Play <i>{clip.length}</i>
            </span>
          </button>
        )}
      </div>

      <ol className="reel-list">
        {clips.map((c, i) => (
          <li key={c.slug}>
            <button aria-pressed={i === active} onClick={() => setActive(i)}>
              <span className="reel-line">{i === active && <span ref={bar} />}</span>
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className="reel-title">{c.title}</span>
              <span className="reel-len">{c.length}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}
