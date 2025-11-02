import { GalleryGrid } from "../GalleryGrid";

export default function GalleryGridExample() {
  const mockImages = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
      title: "Tree Planting Day",
      category: "Events",
      date: "March 2024",
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400",
      title: "Beach Cleanup",
      category: "Projects",
      date: "February 2024",
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400",
      title: "Recycling Workshop",
      category: "Events",
      date: "January 2024",
    },
  ];

  return (
    <div className="p-6">
      <GalleryGrid images={mockImages} />
    </div>
  );
}
