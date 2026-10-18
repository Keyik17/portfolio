import type { Metadata } from "next";
import { WorkIndex } from "@/components/WorkIndex";
import { news } from "@/lib/news";

export const metadata: Metadata = { title: "News" };

export default function News() {
  return (
    <div className="fade">
      <p className="lede">Events, talks and write-ups from around Omaha and Lincoln.</p>
      <WorkIndex
        projects={news.map((n) => ({ slug: n.slug, title: n.title, tags: [n.tag], cover: n.cover }))}
        base="/news"
        label="News"
        toggle={false}
      />
    </div>
  );
}
