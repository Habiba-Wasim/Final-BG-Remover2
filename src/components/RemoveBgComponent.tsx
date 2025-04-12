"use client";
import Image from "next/image";
import { useState } from "react";

export default function RemoveBgComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("/api/remove-bg", { 
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.image) {
        setPreviewImage(result.image);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 flex flex-col items-center">
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-3" />
      {previewImage && <Image src={previewImage} width={300} height={300} alt="Processed Image" />}
      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Remove Background"}
      </button>
    </div>
  );
}
