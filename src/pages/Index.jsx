import { useQuery } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";

const fetchPhotos = async () => {
  const response = await fetch("/api/photos");
  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }
  return response.json();
};

const Index = () => {
  const { data: photos, error, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading photos</div>;

  return (
    <div className="space-y-4">
      {photos.map((photo) => (
        <div key={photo.id} className="border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <img
              src={photo.userProfilePicture}
              alt={photo.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{photo.username}</p>
              <p className="text-xs text-muted-foreground">{photo.time}</p>
            </div>
          </div>
          <img
            src={photo.imageUrl}
            alt={photo.caption}
            className="w-full h-auto mt-4 rounded-lg"
          />
          <p className="mt-2">{photo.caption}</p>
          <div className="flex items-center space-x-4 mt-2">
            <button className="flex items-center space-x-1 text-muted-foreground">
              <Heart className="w-4 h-4" />
              <span>Like</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>Comment</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Index;