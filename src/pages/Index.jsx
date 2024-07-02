import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

const placeholderData = [
  {
    id: 1,
    username: "user1",
    caption: "Beautiful sunset!",
    time: "2 hours ago",
    imageUrl: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    username: "user2",
    caption: "Lovely beach",
    time: "5 hours ago",
    imageUrl: "https://via.placeholder.com/300",
  },
];

const Index = () => {
  const [photos, setPhotos] = useState(placeholderData);

  return (
    <div className="space-y-4">
      {photos.map((photo) => (
        <div key={photo.id} className="border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
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