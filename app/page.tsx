import { WorkIndex } from "@/components/WorkIndex";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="fade">
      <p className="lede">
        {site.name}, {site.role.toLowerCase()}.
      </p>
      <p className="lede">{site.intro}</p>
      <WorkIndex projects={projects} />
    </div>
  );
}
