import { ProjectCard } from "../ProjectCard";

export default function ProjectCardExample() {
  return (
    <div className="p-6">
      <ProjectCard
        id="1"
        title="Campus Waste Reduction Initiative"
        description="A comprehensive program to reduce single-use plastics and implement better recycling practices across campus. We've installed 50 new recycling stations and conducted awareness workshops for over 500 students."
        status="ongoing"
        impact="2,500 kg plastic waste prevented"
      />
    </div>
  );
}
