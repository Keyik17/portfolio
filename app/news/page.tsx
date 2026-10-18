import type { Metadata } from "next";
import { news } from "@/lib/news";

export const metadata: Metadata = { title: "News" };

export default function News() {
  return (
    <div className="fade">
      <p className="lede">Events, talks and write-ups from around Omaha and Lincoln.</p>
      <div className="grid news-grid">
        {news.map((n) => (
          <article key={n.title} className="card">
            <a className="frame" href={n.links[0][1]} target="_blank" rel="noreferrer" aria-label={`${n.title}, ${n.links[0][0]}`}>
              <img src={n.image} alt="" loading="lazy" />
            </a>
            <h2>{n.title}</h2>
            <p>{n.when}</p>
            <div className="news-links">
              {n.links.map(([label, href]) => (
                <a key={href} href={href} target="_blank" rel="noreferrer">
                  {label} <i aria-hidden>↗</i>
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
