import { useQuery } from "@tanstack/react-query";

const fetchProfile = async () => {
  const response = await fetch("/api/profile");
  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }
  return response.json();
};

const Profile = () => {
  const { data: profile, error, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <img
          src={profile.profilePicture}
          alt={profile.username}
          className="w-20 h-20 rounded-full"
        />
        <div>
          <p className="text-2xl font-semibold">{profile.username}</p>
          <p className="text-muted-foreground">{profile.bio}</p>
        </div>
      </div>
      <button className="px-4 py-2 bg-primary text-white rounded-lg">
        Edit Profile
      </button>
      <div className="grid grid-cols-3 gap-4">
        {profile.photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Photo ${index + 1}`}
            className="w-full h-auto rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;