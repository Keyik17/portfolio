"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Clip = { slug: string; title: string };

const clips: Clip[] = [
  { slug: "roundtrip", title: "Roundtrip" },
  { slug: "petal-glow", title: "Petal & Glow" },
  { slug: "section-library", title: "Section Library" },
  { slug: "nsac", title: "NSAC" },
];

const src = (c: Clip, ext: string) => `/reel/${c.slug}.${ext}`;

export function Reel() {
  const [open, setOpen] = useState<Clip | null>(null);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <ul className="reel">
        {clips.map((c) => (
          <li key={c.slug}>
            <Tile clip={c} onOpen={() => setOpen(c)} />
          </li>
        ))}
      </ul>

      {open &&
        createPortal(
          <div className="reel-box" role="dialog" aria-label={`${open.title} walkthrough`} onClick={() => setOpen(null)}>
            <video
              src={src(open, "mp4")}
              poster={src(open, "webp")}
              controls
              autoPlay
              playsInline
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
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
      aria-label={`Watch ${clip.title} walkthrough`}
    >
      <span className="reel-thumb">
        <video ref={v} src={src(clip, "mp4")} poster={src(clip, "webp")} muted loop playsInline preload="none" />
      </span>
      <span className="reel-title">{clip.title}</span>
    </button>
  );
}
