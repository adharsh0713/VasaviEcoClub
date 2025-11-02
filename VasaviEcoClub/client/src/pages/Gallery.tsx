import { GalleryGrid } from "@/components/GalleryGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Gallery() {
  const images = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
      title: "Tree Planting Day 2024",
      category: "Events",
      date: "March 2024",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800",
      title: "Beach Cleanup Success",
      category: "Events",
      date: "February 2024",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800",
      title: "Recycling Workshop",
      category: "Events",
      date: "January 2024",
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800",
      title: "Community Garden Harvest",
      category: "Projects",
      date: "March 2024",
    },
    {
      id: "5",
      url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800",
      title: "Solar Panel Installation",
      category: "Projects",
      date: "December 2023",
    },
    {
      id: "6",
      url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800",
      title: "Team Building Retreat",
      category: "Members",
      date: "November 2023",
    },
    {
      id: "7",
      url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800",
      title: "Campus Composting Setup",
      category: "Projects",
      date: "October 2023",
    },
    {
      id: "8",
      url: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800",
      title: "Wildlife Habitat Creation",
      category: "Projects",
      date: "September 2023",
    },
    {
      id: "9",
      url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800",
      title: "Earth Day Celebration",
      category: "Events",
      date: "April 2023",
    },
  ];

  const eventImages = images.filter((img) => img.category === "Events");
  const projectImages = images.filter((img) => img.category === "Projects");
  const memberImages = images.filter((img) => img.category === "Members");

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-4" data-testid="text-page-title">Photo Gallery</h1>
        <p className="text-lg text-muted-foreground mb-8" data-testid="text-page-description">
          Explore our journey through images of events, projects, and team moments
        </p>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">
              All ({images.length})
            </TabsTrigger>
            <TabsTrigger value="events" data-testid="tab-events">
              Events ({eventImages.length})
            </TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">
              Projects ({projectImages.length})
            </TabsTrigger>
            <TabsTrigger value="members" data-testid="tab-members">
              Members ({memberImages.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <GalleryGrid images={images} />
          </TabsContent>

          <TabsContent value="events">
            <GalleryGrid images={eventImages} />
          </TabsContent>

          <TabsContent value="projects">
            <GalleryGrid images={projectImages} />
          </TabsContent>

          <TabsContent value="members">
            <GalleryGrid images={memberImages} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
