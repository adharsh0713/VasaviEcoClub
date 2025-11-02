import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MemberCardProps {
  id: string;
  name: string;
  role: string;
  year: string;
  imageUrl?: string;
  email?: string;
}

export function MemberCard({ id, name, role, year, imageUrl, email }: MemberCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="hover-elevate transition-all" data-testid={`card-member-${id}`}>
      <CardContent className="p-6 flex flex-col items-center text-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={imageUrl} alt={name} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg" data-testid={`text-member-name-${id}`}>{name}</h3>
          <p className="text-sm text-muted-foreground" data-testid={`text-member-year-${id}`}>{year}</p>
          {email && (
            <p className="text-xs text-muted-foreground" data-testid={`text-member-email-${id}`}>
              {email}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
