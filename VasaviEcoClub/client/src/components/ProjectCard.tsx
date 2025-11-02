import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  status: "ongoing" | "completed";
  impact: string;
  imageUrl?: string;
  teamMembers?: string[];
}

export function ProjectCard({
  id,
  title,
  description,
  status,
  impact,
  imageUrl,
  teamMembers,
}: ProjectCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-project-${id}`}>
      <div className="grid md:grid-cols-2 gap-6">
        {imageUrl && (
          <div className="h-64 md:h-auto bg-muted">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <CardHeader className="p-0 mb-4 gap-2 space-y-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-2xl font-semibold" data-testid={`text-project-title-${id}`}>
                  {title}
                </h3>
                <Badge
                  variant={status === "completed" ? "default" : "secondary"}
                  className="flex items-center gap-1"
                  data-testid={`badge-project-status-${id}`}
                >
                  {status === "completed" ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <Clock className="h-3 w-3" />
                  )}
                  {status === "completed" ? "Completed" : "Ongoing"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <p className="text-muted-foreground" data-testid={`text-project-description-${id}`}>
                {description}
              </p>
              {teamMembers && teamMembers.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-muted-foreground">Team Members</p>
                  </div>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1" data-testid={`text-project-team-${id}`}>
                    {teamMembers.map((member, index) => (
                      <li key={index}>{member}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="border-l-4 border-primary pl-4">
                <p className="text-sm font-medium text-muted-foreground">Impact</p>
                <p className="text-lg font-semibold" data-testid={`text-project-impact-${id}`}>{impact}</p>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </Card>
  );
}
