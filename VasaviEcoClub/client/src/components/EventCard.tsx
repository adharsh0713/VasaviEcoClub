import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
  participantCount: number;
  category: string;
  status?: string;
  isRegistered?: boolean;
  externalRegistrationUrl?: string;
  onRegister?: (id: string) => void;
}

export function EventCard({
  id,
  title,
  date,
  location,
  description,
  imageUrl,
  participantCount,
  category,
  status = "upcoming",
  isRegistered = false,
  externalRegistrationUrl,
  onRegister,
}: EventCardProps) {
  const handleRegisterClick = () => {
    if (externalRegistrationUrl) {
      window.open(externalRegistrationUrl, '_blank');
    } else {
      onRegister?.(id);
    }
  };
  return (
    <Card className="overflow-hidden hover-elevate transition-all" data-testid={`card-event-${id}`}>
      {imageUrl && (
        <div className="relative h-48 bg-muted">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-4 left-4" data-testid={`badge-category-${id}`}>
            {category}
          </Badge>
        </div>
      )}
      <CardHeader className="gap-2 space-y-0 pb-4">
        <h3 className="text-xl font-semibold" data-testid={`text-event-title-${id}`}>{title}</h3>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span data-testid={`text-event-date-${id}`}>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span data-testid={`text-event-location-${id}`}>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span data-testid={`text-event-participants-${id}`}>{participantCount} registered</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground" data-testid={`text-event-description-${id}`}>
          {description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant={isRegistered ? "secondary" : "default"}
          className="w-full"
          onClick={handleRegisterClick}
          data-testid={`button-register-${id}`}
          disabled={status === "past"}
        >
          {status === "past" ? "Registration Closed" : isRegistered ? "Registered" : "Register Now"}
        </Button>
      </CardFooter>
    </Card>
  );
}
