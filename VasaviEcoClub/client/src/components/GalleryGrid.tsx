import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  date: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card
            key={image.id}
            className="overflow-hidden cursor-pointer hover-elevate transition-all group"
            onClick={() => setSelectedImage(image)}
            data-testid={`card-gallery-${image.id}`}
          >
            <div className="relative aspect-video bg-muted">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div className="text-white">
                  <p className="font-semibold" data-testid={`text-gallery-title-${image.id}`}>{image.title}</p>
                  <p className="text-sm" data-testid={`text-gallery-date-${image.id}`}>{image.date}</p>
                </div>
              </div>
              <Badge className="absolute top-4 left-4" data-testid={`badge-gallery-category-${image.id}`}>
                {image.category}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
            data-testid="button-close-lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="max-w-6xl w-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              data-testid="img-lightbox"
            />
            <div className="text-white text-center mt-4">
              <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              <p className="text-sm text-gray-300">{selectedImage.category} • {selectedImage.date}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
