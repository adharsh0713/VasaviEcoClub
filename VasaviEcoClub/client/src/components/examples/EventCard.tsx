import { EventCard } from "../EventCard";

export default function EventCardExample() {
  return (
    <div className="p-6 max-w-sm">
      <EventCard
        id="1"
        title="Campus Tree Planting Drive"
        date="March 15, 2024"
        location="Main Campus Lawn"
        description="Join us for our annual tree planting initiative. We aim to plant 100 trees across the campus to improve air quality and create a greener environment."
        category="Planting"
        participantCount={45}
        onRegister={(id) => console.log(`Register for event: ${id}`)}
      />
    </div>
  );
}
