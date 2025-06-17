import { useRef, useState } from "react";
import { Plus } from "lucide-react";
import { uploadFile } from "../../lib/api/file";

interface ImageUploaderProps {
  onUpload: (paths: string[]) => void;
}

export default function ImageUploader({ onUpload }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const pngFiles = Array.from(files).filter(
      (file) => file.type === "image/png"
    );

    if (pngFiles.length === 0) {
      return;
    }

    const uploadedResults = await Promise.all(pngFiles.map(uploadFile));

    const validPaths = uploadedResults
      .filter((r): r is { path: string } => !!r)
      .map((r) => r.path);

    if (validPaths.length > 0) {
      onUpload(validPaths);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/png"
        multiple
        hidden
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`relative flex items-center justify-center border-2 border-dashed rounded-xl aspect-square transition-colors cursor-pointer hover:bg-signature/10 border-signature 
          ${isDragging ? "bg-signature/30" : "border-border"}`}
      >
        <Plus
          size={36}
          className="text-signature absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </>
  );
}
