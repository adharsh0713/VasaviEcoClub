import { useState } from "react";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Activities() {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const events = [
    {
      id: "1",
      title: "Campus Tree Planting Drive",
      date: "March 15, 2024",
      location: "Main Campus Lawn",
      description: "Join us for our annual tree planting initiative. We aim to plant 100 trees across the campus to improve air quality and create a greener environment.",
      category: "Planting",
      participantCount: 45,
      status: "upcoming",
    },
    {
      id: "2",
      title: "Waste Management Workshop",
      date: "March 20, 2024",
      location: "Science Building, Room 301",
      description: "Learn about effective waste segregation and composting techniques for sustainable living.",
      category: "Workshop",
      participantCount: 32,
      status: "upcoming",
    },
    {
      id: "3",
      title: "Beach Cleanup Drive",
      date: "March 25, 2024",
      location: "City Beach",
      description: "Help us clean our local beach and protect marine life from plastic pollution.",
      category: "Cleanup",
      participantCount: 28,
      status: "upcoming",
    },
    {
      id: "4",
      title: "Earth Day Celebration",
      date: "April 22, 2024",
      location: "Campus Auditorium",
      description: "Celebrate Earth Day with eco-friendly activities, guest speakers, and an environmental film screening.",
      category: "Event",
      participantCount: 120,
      status: "upcoming",
    },
    {
      id: "5",
      title: "Solar Panel Installation",
      date: "February 10, 2024",
      location: "Engineering Building Rooftop",
      description: "Successfully installed 20 solar panels to power the engineering building sustainably.",
      category: "Project",
      participantCount: 15,
      status: "past",
    },
    {
      id: "6",
      title: "Composting Initiative Launch",
      date: "January 15, 2024",
      location: "Campus Gardens",
      description: "Launched our campus-wide composting program with workshops and distribution of compost bins.",
      category: "Workshop",
      participantCount: 55,
      status: "past",
    },
  ];

  const handleRegister = (id: string) => {
    if (registeredEvents.includes(id)) {
      setRegisteredEvents(registeredEvents.filter((eventId) => eventId !== id));
      console.log(`Unregistered from event: ${id}`);
    } else {
      setRegisteredEvents([...registeredEvents, id]);
      console.log(`Registered for event: ${id}`);
    }
  };

  const upcomingEvents = events.filter((e) => e.status === "upcoming");
  const pastEvents = events.filter((e) => e.status === "past");

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Events & Activities</h1>
        <p className="text-lg text-muted-foreground mb-8" data-testid="text-page-description">
          Join our events and make a difference in environmental conservation
        </p>

        <Tabs defaultValue="upcoming" className="space-y-8">
          <TabsList>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past">
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  isRegistered={registeredEvents.includes(event.id)}
                  onRegister={handleRegister}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard
                  key={event.id}
                  {...event}
                  isRegistered={false}
                  onRegister={() => {}}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
