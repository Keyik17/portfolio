"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Clip = { slug: string; title: string };

export const clips: Clip[] = [
  { slug: "roundtrip", title: "Roundtrip" },
  { slug: "petal-glow", title: "Petal & Glow" },
  { slug: "section-library", title: "Section Library" },
  { slug: "nsac", title: "NSAC" },
];

// Small copies for the hover previews; full-quality ones for watching.
const src = (c: Clip, ext: string) => `/reel/${c.slug}.${ext}`;
const full = (c: Clip) => `/media/reel/${c.slug}.mp4`;
// Phones show the player a few hundred pixels wide, so the small copy looks the same there.
const watch = (c: Clip) => (window.innerWidth < 900 ? src(c, "mp4") : full(c));

export function Reel() {
  const [open, setOpen] = useState<Clip | null>(null);
  return (
    <section aria-label="Video tours">
      <div className="bar">
        <small>Video tours</small>
      </div>
      <ul className="reel">
        {clips.map((c) => (
          <li key={c.slug}>
            <Tile clip={c} onOpen={() => setOpen(c)} />
          </li>
        ))}
      </ul>
      {open && <Player clip={open} onClose={() => setOpen(null)} />}
    </section>
  );
}

// "Watch the tour" button on a case study.
export function WatchButton({ slug }: { slug: string }) {
  const clip = clips.find((c) => c.slug === slug);
  const [open, setOpen] = useState(false);
  if (!clip) return null;
  return (
    <>
      <button className="visit watch" onClick={() => setOpen(true)}>
        Watch the tour <i aria-hidden>▶</i>
      </button>
      {open && <Player clip={clip} onClose={() => setOpen(false)} />}
    </>
  );
}

function Player({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div className="reel-box" role="dialog" aria-label={`${clip.title} video tour`} onClick={onClose}>
      <video
        src={watch(clip)}
        poster={src(clip, "webp")}
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  );
}

// A small still that quietly plays on hover; click opens it with sound.
function Tile({ clip, onOpen }: { clip: Clip; onOpen: () => void }) {
  const v = useRef<HTMLVideoElement>(null);
  return (
    <button
      className="reel-tile"
      onClick={onOpen}
      onPointerEnter={(e) => e.pointerType === "mouse" && v.current?.play().catch(() => {})}
      onPointerLeave={() => v.current?.pause()}
      aria-label={`Watch ${clip.title} video tour`}
    >
      <span className="reel-thumb">
        <video ref={v} src={src(clip, "mp4")} poster={src(clip, "webp")} muted loop playsInline preload="none" />
      </span>
      <span className="reel-title">{clip.title}</span>
    </button>
  );
}
