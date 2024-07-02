import { rest } from "msw";

const handlers = [
  rest.post("/api/upload", (req, res, ctx) => {
    // Mock response for photo upload
    return res(ctx.status(200), ctx.json({ message: "Photo uploaded successfully" }));
  }),
  rest.get("/api/photos", (req, res, ctx) => {
    // Mock response for fetching photos
    const photos = [
      {
        id: 1,
        username: "user1",
        caption: "Beautiful sunset!",
        time: "2 hours ago",
        imageUrl: "https://via.placeholder.com/300",
        userProfilePicture: "https://via.placeholder.com/40",
      },
      {
        id: 2,
        username: "user2",
        caption: "Lovely beach",
        time: "5 hours ago",
        imageUrl: "https://via.placeholder.com/300",
        userProfilePicture: "https://via.placeholder.com/40",
      },
    ];
    return res(ctx.status(200), ctx.json(photos));
  }),
  rest.get("/api/profile", (req, res, ctx) => {
    // Mock response for fetching profile
    const profile = {
      username: "user1",
      bio: "Photographer & Traveler",
      profilePicture: "https://via.placeholder.com/100",
      photos: [
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
      ],
    };
    return res(ctx.status(200), ctx.json(profile));
  }),
];

export { handlers };