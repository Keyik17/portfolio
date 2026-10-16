import { site } from "@/lib/site";
import { CatToys } from "./CatToys";

export function Footer() {
  const links = site.links.filter((l) => l.href && !l.href.startsWith("mailto:"));

  return (
    <footer className="footer">
      <div className="footer-info">
        <p className="footer-lead">
          Let&rsquo;s work together.
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        <p className="footer-services">
          {/* keep hyphenated words like "back-end" from breaking across lines */}
          {site.services.split(" ").map((w, i) => (
            <span key={i}>
              {i > 0 && " "}
              {w.includes("-") ? <span className="nowrap">{w}</span> : w}
            </span>
          ))}
        </p>
        <p className="footer-meta">
          <span>{site.location}</span>
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </p>
      </div>

      <p className="toys-hint">Drag or boop the cats</p>
      <CatToys />
    </footer>
  );
}
