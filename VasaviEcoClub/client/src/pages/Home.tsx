import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EventCard } from "@/components/EventCard";
import { MetricCard } from "@/components/MetricCard";
import { Trees, Droplets, Recycle, Users, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Event } from "@shared/schema";

export default function Home() {
  const { data: eventsData } = useQuery<{ success: boolean; data: Event[] }>({
    queryKey: ["/api/events"],
  });

  const events = eventsData?.data || [];
  const ongoingEvents = events.filter((e) => e.status === "ongoing");

  const metrics = [
    { id: "trees", title: "Trees Planted", value: "1,250", icon: Trees, description: "This year" },
    { id: "water", title: "Water Saved", value: "50,000L", icon: Droplets, description: "Through conservation" },
    { id: "waste", title: "Waste Recycled", value: "2.5 Tons", icon: Recycle, description: "Campus recycling" },
    { id: "members", title: "Active Members", value: "180", icon: Users, description: "And growing" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <section className="relative bg-gradient-to-br from-primary/20 to-primary/5 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
              Building a Sustainable Future Together
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-hero-description">
              Join our community of passionate students making a real difference in environmental conservation. 
              Together, we can create lasting change.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/activities">
                <Button size="lg" data-testid="button-view-events">
                  View Events
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/impact">
                <Button size="lg" variant="outline" data-testid="button-our-impact">
                  Our Impact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" data-testid="text-section-mission">Our Mission</h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground" data-testid="text-mission-statement">
                The Eco Club is dedicated to fostering environmental awareness and promoting sustainable practices 
                within our college community. Through hands-on projects, educational workshops, and community 
                engagement, we strive to create a greener, more sustainable campus and inspire others to join 
                the movement for environmental conservation.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8" data-testid="text-section-impact">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <MetricCard key={metric.id} {...metric} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" data-testid="text-section-events">Ongoing Events</h2>
            <Link href="/activities">
              <Button variant="ghost" data-testid="button-view-all-events">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {ongoingEvents.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No ongoing events</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  description={event.description}
                  category={event.category}
                  imageUrl={event.imageUrl || undefined}
                  participantCount={0}
                  status={event.status}
                  externalRegistrationUrl={event.externalRegistrationUrl || undefined}
                  onRegister={() => console.log(`Register for event: ${event.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
