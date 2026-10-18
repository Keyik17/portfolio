import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNews, news } from "@/lib/news";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const n = getNews((await params).slug);
  return n ? { title: n.title, description: n.summary } : {};
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const n = getNews((await params).slug);
  if (!n) notFound();

  const i = news.indexOf(n);
  const prev = news[(i - 1 + news.length) % news.length];
  const next = news[(i + 1) % news.length];

  return (
    <article className="case fade">
      <Link href="/news/" className="back">
        ← back
      </Link>
      <h1>{n.title}</h1>
      <p className="sum">{n.summary}</p>
      <div className="actions">
        {n.links.map(([label, href], k) => (
          <a key={href} className={k === 0 ? "visit" : "watch"} href={href} target="_blank" rel="noreferrer">
            {label} <i aria-hidden>↗</i>
          </a>
        ))}
      </div>

      <dl className="meta">
        {n.meta.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>

      <div className="prose">
        {n.body.map((t) => (
          <p key={t.slice(0, 24)}>{t}</p>
        ))}
      </div>

      <div className="figs">
        {n.images.map((m) => (
          <figure key={m.src}>
            <div className="frame">
              <img src={m.src} alt={m.alt} loading="lazy" decoding="async" />
            </div>
            <figcaption>{m.caption}</figcaption>
          </figure>
        ))}
      </div>

      <nav className="next" aria-label="More news">
        <Link href={`/news/${prev.slug}/`}>
          <span>← Previous</span>
          <b>{prev.title}</b>
        </Link>
        <Link href={`/news/${next.slug}/`}>
          <span>Next →</span>
          <b>{next.title}</b>
        </Link>
      </nav>
    </article>
  );
}
