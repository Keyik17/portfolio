import type { Metadata } from "next";
import Link from "next/link";
import { WatchButton } from "@/components/Reel";
import { notFound, redirect } from "next/navigation";
import { Figure } from "@/components/Figure";
import { getProject, movedProjects, projects } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...projects.map((p) => p.slug), ...Object.keys(movedProjects)].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function Work({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (movedProjects[slug]) redirect(`/work/${movedProjects[slug]}/`);
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="case fade">
      <Link href="/" className="back">
        ← back
      </Link>
      <h1>{p.title}</h1>
      <p className="sum">{p.summary}</p>
      <div className="actions">
        {p.live && (
          <a className="visit" href={p.live.href} target="_blank" rel="noreferrer">
            Visit site <i aria-hidden>↗</i>
          </a>
        )}
        <WatchButton slug={p.slug} />
      </div>

      <dl className="meta">
        {p.meta.map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>
              {m.href ? (
                <a href={m.href} target="_blank" rel="noreferrer">
                  {m.value} ↗
                </a>
              ) : (
                m.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <div className="prose">
        {p.body.map((t) => (
          <p key={t.slice(0, 24)}>{t}</p>
        ))}
      </div>

      <div className="figs">
        {p.media.map((m, k) => (
          <Figure key={k} m={m} />
        ))}
      </div>

      <nav className="next" aria-label="More work">
        <Link href={`/work/${prev.slug}/`}>
          <span>← Previous</span>
          <b>{prev.title}</b>
        </Link>
        <Link href={`/work/${next.slug}/`}>
          <span>Next →</span>
          <b>{next.title}</b>
        </Link>
      </nav>
    </article>
  );
}
