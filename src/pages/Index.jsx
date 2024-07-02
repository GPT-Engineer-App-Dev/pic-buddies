import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const fetchPhotos = async () => {
  const response = await fetch("/api/photos");
  if (!response.ok) {
    throw new Error("Failed to fetch photos");
  }
  return response.json();
};

const likePhoto = async (photoId) => {
  const response = await fetch(`/api/photos/${photoId}/like`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to like photo");
  }
  return response.json();
};

const Index = () => {
  const queryClient = useQueryClient();
  const { data: photos, error, isLoading } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhotos,
  });

  const mutation = useMutation({
    mutationFn: likePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries("photos");
      toast("Photo liked successfully!");
    },
    onError: () => {
      toast("Failed to like photo. Please try again.");
    },
  });

  const handleLike = (photoId) => {
    mutation.mutate(photoId);
  };

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
            <button
              className={`flex items-center space-x-1 ${
                photo.liked ? "text-red-500" : "text-muted-foreground"
              }`}
              onClick={() => handleLike(photo.id)}
            >
              <Heart className="w-4 h-4" />
              <span>{photo.likes}</span>
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