import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EventCard } from "@/components/EventCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventRegistrationModal } from "@/components/EventRegistrationModal";
import type { Event } from "@shared/schema";

export default function Activities() {
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string } | null>(null);

  const { data: eventsData, isLoading } = useQuery<{ success: boolean; data: Event[] }>({
    queryKey: ["/api/events"],
  });

  const events = eventsData?.data || [];

  const handleRegister = (id: string, title: string, status: string) => {
    if (status === "past") {
      return; // Do nothing for past events
    }
    setSelectedEvent({ id, title });
  };

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const ongoingEvents = events.filter((e) => e.status === "ongoing");
  const pastEvents = events.filter((e) => e.status === "past");

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Events & Activities</h1>
        <p className="text-lg text-muted-foreground mb-8" data-testid="text-page-description">
          Join our events and make a difference in environmental conservation
        </p>

        <Tabs defaultValue="ongoing" className="space-y-8">
          <TabsList>
            <TabsTrigger value="ongoing" data-testid="tab-ongoing">
              Ongoing Events
            </TabsTrigger>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past">
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-6">
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
                    onRegister={() => handleRegister(event.id, event.title, event.status)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No upcoming events</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
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
                    onRegister={() => handleRegister(event.id, event.title, event.status)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastEvents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No past events</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
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
                    isRegistered={false}
                    onRegister={() => {}}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {selectedEvent && (
          <EventRegistrationModal
            eventId={selectedEvent.id}
            eventTitle={selectedEvent.title}
            open={!!selectedEvent}
            onOpenChange={(open) => !open && setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
}
