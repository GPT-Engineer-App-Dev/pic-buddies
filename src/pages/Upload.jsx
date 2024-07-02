import { useState } from "react";

const UploadPage = () => {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  const handlePhotoChange = (e) => {
    setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle photo upload logic here
    console.log({ photo, caption, tags });
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Upload Photo</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"
        />
        {photo && (
          <img
            src={photo}
            alt="Preview"
            className="w-full h-auto mt-4 rounded-lg"
          />
        )}
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="block w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="block w-full px-4 py-2 bg-primary text-white rounded-lg"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadPage;