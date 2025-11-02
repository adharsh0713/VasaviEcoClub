import { ProjectCard } from "@/components/ProjectCard";

export default function Projects() {
  const projects = [
    {
      id: "1",
      title: "Aquave - Water Control System",
      description: "A sensor-based automatic water motor control system for efficient water management across campus. During the planning phase, our team proposed implementing the system across the entire college. However, due to the interconnection of all borewells, implementation was limited to a feasibility study and analysis of the existing automated system in V Block. The project includes assessment of water plant operations at J.C. Bose Block, Canteen, V Block, and PIM Block. A float valve system is already operational at the RO water plant's raw water tank for overflow prevention.",
      status: "ongoing" as const,
      impact: "Feasibility study completed for campus-wide implementation",
      teamMembers: [
        "T.Saimanish (1602-24-735-043)",
        "D.Sreeja (1602-24-735-053)",
        "D.B. Varshini (1602-24-735-010)",
        "V.Parihas (1602-24-735-034)",
        "Khalid Ayaan (1602-24-748-025)"
      ],
    },
    {
      id: "2",
      title: "Dustbin Reachability Project",
      description: "An initiative to improve waste management accessibility and promote better waste segregation practices across campus facilities.",
      status: "ongoing" as const,
      impact: "Enhancing waste management infrastructure",
      teamMembers: [],
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Our Projects</h1>
        <p className="text-lg text-muted-foreground mb-12" data-testid="text-page-description">
          Discover our environmental initiatives and their measurable impact on campus sustainability
        </p>

        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
