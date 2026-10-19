"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/projects";

type View = "list" | "grid";
// The works index, also reused for the news list.
type Item = Pick<Project, "slug" | "title" | "tags" | "cover">;

export function WorkIndex({
  projects,
  base = "/work",
  label = "Selected work",
  toggle = true,
}: {
  projects: Item[];
  base?: string;
  label?: string;
  toggle?: boolean;
}) {
  const [view, setView] = useState<View>("list");
  const [hovered, setHovered] = useState<Item | null>(null);
  const peek = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fetch the hover previews quietly once the page has loaded, so they appear
  // instantly. Skipped on touch screens, which never show them.
  const [warm, setWarm] = useState(false);
  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    let t = 0;
    const go = () => (t = window.setTimeout(() => setWarm(true), 600));
    if (document.readyState === "complete") go();
    else addEventListener("load", go, { once: true });
    return () => {
      removeEventListener("load", go);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("view");
      if (toggle && (saved === "grid" || saved === "list")) setView(saved);
    } catch {}
  }, [toggle]);

  const choose = (v: View) => {
    setView(v);
    try {
      localStorage.setItem("view", v);
    } catch {}
  };

  // The preview trails the cursor with a little lag.
  useEffect(() => {
    let px = -1,
      py = -1,
      cx = 0,
      cy = 0,
      raf = 0,
      first = true;
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
        <small>{label}</small>
        {toggle && (
          <div className="toggle" role="group" aria-label="Layout">
            <button
              aria-pressed={view === "list"}
              aria-label="List view"
              onClick={() => choose("list")}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <rect x="1.5" y="2.5" width="11" height="3.5" rx="1" />
                <rect x="1.5" y="8" width="11" height="3.5" rx="1" />
              </svg>
            </button>
            <button
              aria-pressed={view === "grid"}
              aria-label="Grid view"
              onClick={() => choose("grid")}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.2" />
                <rect x="8" y="1.5" width="4.5" height="4.5" rx="1.2" />
                <rect x="1.5" y="8" width="4.5" height="4.5" rx="1.2" />
                <rect x="8" y="8" width="4.5" height="4.5" rx="1.2" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {view === "list" ? (
        <ul className="list fade" onPointerLeave={() => setHovered(null)}>
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`${base}/${p.slug}/`}
                className="row"
                onPointerEnter={() => setHovered(p)}
              >
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
            <Link key={p.slug} href={`${base}/${p.slug}/`} className="card">
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
          <div
            ref={peek}
            className={`peek${view === "list" && hovered ? " on" : ""}`}
            aria-hidden
          >
            {projects.map((p) => (
              <div
                key={p.slug}
                style={{
                  display: hovered?.slug === p.slug ? "contents" : "none",
                }}
              >
                <Cover p={p} eager={warm} />
              </div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

// Lists and cards show a small copy of each cover; see the -thumb files next to them.
const thumb = (src: string) => src.replace(/\.webp$/, "-thumb.webp");

function Cover({ p, eager = false }: { p: Item; eager?: boolean }) {
  if (p.cover) return <img src={thumb(p.cover)} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />;
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
