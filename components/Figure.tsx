import { platformSpec, type Media } from "@/lib/projects";

export function Figure({ m }: { m: Media }) {
  return (
    <figure>
      {m.kind === "image" && (
        <div className="frame">
          <img src={m.src} alt={m.alt} loading="lazy" />
        </div>
      )}
      {m.kind === "page" && (
        <div className="frame page-frame">
          <div className="page-scroll" tabIndex={0} aria-label={`${m.alt} (scrollable)`}>
            <img src={m.src} alt={m.alt} loading="lazy" />
          </div>
        </div>
      )}
      {m.kind === "phones" && (
        <div className="frame">
          <div className="phones" style={{ "--n": m.items.length } as React.CSSProperties}>
            {m.items.map((i) => (
              <img key={i.src} src={i.src} alt={i.alt} loading="lazy" />
            ))}
          </div>
        </div>
      )}
      {m.kind === "spec" && (
        <div className="frame spec">
          <div className="stats">
            {platformSpec.stats.map((s) => (
              <div className="stat" key={s.label}>
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <table>
            <tbody>
              {platformSpec.stack.map(([k, v]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {m.caption && <figcaption>{m.caption}</figcaption>}
    </figure>
  );
}
