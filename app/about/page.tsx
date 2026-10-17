import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

const experience = [
  ["IDKWebsites, internship", "Platform code, tenant sites, booking widget"],
  ["Senior design capstone", "Nebraska Strategic Ag Coalition platform"],
];

const tools = [
  ["Design", "pen.dev, Figma"],
  ["Build", "Next.js, React, TypeScript, Tailwind"],
  ["Platform", "Payload CMS, PostgreSQL, Supabase, Convex"],
  ["Ship", "Vercel, Cloudflare Workers, GitHub Actions"],
];

export default function About() {
  return (
    <div className="about fade">
      <p>
        {site.name}, {site.role.toLowerCase()}.
      </p>
      <p>
        I enjoy simple, clear interfaces.
      </p>
      <p>
        I work on both the front end and the back end. So far that has meant websites for small businesses and building
        B2B SaaS products, from the database and APIs to the screens people use. As a person, I like to think I am funny,
        easy going and quick to learn new things.
      </p>

      <h2>Experience</h2>
      <ul>
        {experience.map(([a, b]) => (
          <li key={a}>
            <span>{a}</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <h2>Tools</h2>
      <ul>
        {tools.map(([a, b]) => (
          <li key={a}>
            <span>{a}</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}
