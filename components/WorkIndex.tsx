"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/projects";

type View = "list" | "grid";

export function WorkIndex({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<View>("list");
  const [hovered, setHovered] = useState<Project | null>(null);
  const peek = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("view");
      if (saved === "grid" || saved === "list") setView(saved);
    } catch {}
  }, []);

  const choose = (v: View) => {
    setView(v);
    try {
      localStorage.setItem("view", v);
    } catch {}
  };

  // The preview trails the cursor with a little lag.
  useEffect(() => {
    let px = -1, py = -1, cx = 0, cy = 0, raf = 0, first = true;
    // Where the preview should sit for the current cursor. It always stays
    // fully on screen: it flips above or to the left of the cursor when there
    // is no room, then clamps to the window edges.
    const target = () => {
      const w = peek.current?.offsetWidth ?? 0;
      const h = peek.current?.offsetHeight ?? 0;
      const pad = 16;
      let x = px + 24;
      if (x + w > window.innerWidth - pad) x = px - 24 - w;
      let y = py - 110;
      if (y + h > window.innerHeight - pad) y = py - h - 24;
      x = Math.max(pad, Math.min(x, window.innerWidth - w - pad));
      y = Math.max(pad, Math.min(y, window.innerHeight - h - pad));
      return [x, y];
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (first) {
        [cx, cy] = target();
        first = false;
      }
    };
    const loop = () => {
      if (px >= 0) {
        const [x, y] = target();
        cx += (x - cx) * 0.18;
        cy += (y - cy) * 0.18;
        if (peek.current) peek.current.style.translate = `${cx}px ${cy}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="bar">
        <small>Selected work</small>
        <div className="toggle" role="group" aria-label="Layout">
          <button aria-pressed={view === "list"} aria-label="List view" onClick={() => choose("list")}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="1.5" y="2.5" width="11" height="3.5" rx="1" />
              <rect x="1.5" y="8" width="11" height="3.5" rx="1" />
            </svg>
          </button>
          <button aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => choose("grid")}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.2" />
              <rect x="8" y="1.5" width="4.5" height="4.5" rx="1.2" />
              <rect x="1.5" y="8" width="4.5" height="4.5" rx="1.2" />
              <rect x="8" y="8" width="4.5" height="4.5" rx="1.2" />
            </svg>
          </button>
        </div>
      </div>

      {view === "list" ? (
        <ul className="list fade" onPointerLeave={() => setHovered(null)}>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}/`} className="row" onPointerEnter={() => setHovered(p)}>
                {/* phones have no hover preview, so rows carry their own thumbnail */}
                <div className="row-thumb" aria-hidden>
                  <Cover p={p} />
                </div>
                <h2>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  {p.title}
                </h2>
                <p>{p.tags.join(", ")}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid fade">
          {projects.map((p) => (
            <Link key={p.slug} href={`/work/${p.slug}/`} className="card">
              <div className="frame">
                <Cover p={p} />
              </div>
              <h2>{p.title}</h2>
              <p>{p.tags.join(", ")}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Rendered on <body> so the page's own transforms never shift it. */}
      {mounted &&
        createPortal(
          <div ref={peek} className={`peek${view === "list" && hovered ? " on" : ""}`} aria-hidden>
            {projects.map((p) => (
              <div key={p.slug} style={{ display: hovered?.slug === p.slug ? "contents" : "none" }}>
                <Cover p={p} />
              </div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

function Cover({ p }: { p: Project }) {
  if (p.cover) return <img src={p.cover} alt="" loading="lazy" />;
  return (
    <div className="code-tile">
      <span>~/multitenant-cms</span>
      <span>
        <b>$</b> pnpm dev
      </span>
      <span>▲ Next.js 15 · Payload 3 · Postgres</span>
      <span>✓ ready · 70+ blocks · 21 themes</span>
    </div>
  );
}
