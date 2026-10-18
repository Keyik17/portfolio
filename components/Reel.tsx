"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Clip = { slug: string; title: string };

export const clips: Clip[] = [
  { slug: "roundtrip", title: "Roundtrip" },
  { slug: "nsac", title: "NSAC" },
  { slug: "section-library", title: "Section Library" },
  { slug: "petal-glow", title: "Petal & Glow" },
];

// Small copies for the hover previews; full-quality ones (in R2, served by keyik.dev) for watching.
const src = (c: Clip, ext: string) => `/reel/${c.slug}.${ext}`;
const host = process.env.NODE_ENV === "development" ? "https://keyik.dev" : "";
// Bump v when the files in R2 are replaced; they are cached for a year.
const watch = (c: Clip) => `${host}/media/reel/${c.slug}.mp4?v=2`;

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

// "Video tutorial" button on a case study.
export function WatchButton({ slug }: { slug: string }) {
  const clip = clips.find((c) => c.slug === slug);
  const [open, setOpen] = useState(false);
  if (!clip) return null;
  return (
    <>
      <button className="watch" onClick={() => setOpen(true)}>
        Video tutorial
      </button>
      {open && <Player clip={clip} onClose={() => setOpen(false)} />}
    </>
  );
}

function Player({ clip, onClose }: { clip: Clip; onClose: () => void }) {
  const v = useRef<HTMLVideoElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const toggle = () => {
    const el = v.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => {});
    else el.pause();
  };

  const box = useRef<HTMLDivElement>(null);
  const expand = () => {
    const el = box.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    const vid = v.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (document.fullscreenElement) return void document.exitFullscreen();
    if (el?.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (el?.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else vid?.webkitEnterFullscreen?.(); // iPhone only lets the video itself go full screen
  };

  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = v.current;
    if (!el?.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.currentTime = ((e.clientX - r.left) / r.width) * el.duration;
  };

  return createPortal(
    <div
      className="reel-box"
      role="dialog"
      aria-label={`${clip.title} video tutorial`}
      onClick={onClose}
    >
      <div className="reel-stage" onClick={(e) => e.stopPropagation()}>
        <button className="reel-back" onClick={onClose}>
          ← back
        </button>
        <div ref={box} className={`reel-player${playing ? " is-playing" : ""}`}>
          <video
            ref={v}
            src={watch(clip)}
            poster={src(clip, "webp")}
            autoPlay
            playsInline
            onClick={toggle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => {
              const el = e.currentTarget;
              if (fill.current)
                fill.current.style.transform = `scaleX(${el.duration ? el.currentTime / el.duration : 0})`;
            }}
          />
          <button
            className="reel-toggle"
            onClick={toggle}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                <rect
                  x="4"
                  y="3"
                  width="2.6"
                  height="10"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="9.4"
                  y="3"
                  width="2.6"
                  height="10"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                <path
                  d="M5 3.2v9.6c0 .5.5.8.9.5l7.2-4.8a.6.6 0 000-1L5.9 2.7c-.4-.3-.9 0-.9.5z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
          <button className="reel-expand" onClick={expand} aria-label="Full screen">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M1.5 5V1.5H5M9 1.5h3.5V5M12.5 9v3.5H9M5 12.5H1.5V9" />
            </svg>
          </button>
          <div
            className="reel-progress"
            onPointerDown={seek}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span ref={fill} />
          </div>
        </div>
      </div>
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
      onPointerEnter={(e) =>
        e.pointerType === "mouse" && v.current?.play().catch(() => {})
      }
      onPointerLeave={() => v.current?.pause()}
      aria-label={`Watch ${clip.title} video tutorial`}
    >
      <span className="reel-thumb">
        <video
          ref={v}
          src={src(clip, "mp4")}
          poster={src(clip, "webp")}
          muted
          loop
          playsInline
          preload="none"
        />
      </span>
      <span className="reel-title">{clip.title}</span>
    </button>
  );
}
