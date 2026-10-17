import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

const experience = [
  ["IDKWebsites, internship", "Platform code, tenant sites, booking widget"],
];

const tools = [
  ["Design", "pen.dev, Figma"],
  ["Build", "Next.js, React, TypeScript, Tailwind"],
  ["Platform", "Payload CMS, PostgreSQL, Supabase, Vercel"],
];

export default function About() {
  return (
    <div className="about fade">
      <p>
        {site.name}, {site.role.toLowerCase()}.
      </p>
      <p>
        I enjoy simple, clear interfaces: a booking flow that only takes a few taps, a law firm site that feels calm, a
        landing page with a bit of play in it.
      </p>
      <p>
        So far I have designed websites for a diesel repair crew, a drain cleaning company, a parcel shipper, law firms and a med spa. During my
        internship I also helped on the code side, on a multi-tenant platform that runs those websites and their scheduling.
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
