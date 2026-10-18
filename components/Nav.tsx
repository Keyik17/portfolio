"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "works" },
  { href: "/news/", label: "news" },
  { href: "/about/", label: "about" },
];

export function Nav() {
  const path = usePathname();
  const active = (href: string) =>
    href === "/" ? path === "/" || path.startsWith("/work") : path.startsWith(href.slice(0, -1));

  return (
    <nav className="nav" aria-label="Primary">
      <Link href="/" className="mark" aria-label="Keyik, home" />
      {items.map((i) => (
        <Link key={i.href} href={i.href} aria-current={active(i.href) ? "page" : undefined}>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
