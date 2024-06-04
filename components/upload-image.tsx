"use client";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { toast } from "./ui/use-toast";

const UploadImage = () => {
  const [imageURL, setImageURL] = useState("" as string);
  const [copied, setCopied] = useState(false);

  const handleSuccess = (result: any) => {
    const uploadedImageUrl = result.info.url;
    setImageURL(uploadedImageUrl);
    setCopied(false);
  };

  const handleCopy = () => {
    if (imageURL) {
      navigator.clipboard.writeText(imageURL).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
        (err) => {
          toast({
            title: "Error",
            description: err.message,
          });
        }
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-5">
      <h2 className="text-center font-semibold text-xl">
        Upload image to Cloudinary
      </h2>
      <div className="flex items-center justify-center">
        <CldUploadWidget
          uploadPreset="blog.hongducdev"
          onSuccess={handleSuccess}
          onError={(error) => console.error(error)}
        >
          {({ open }) => {
            return <Button onClick={() => open()}>Upload Image</Button>;
          }}
        </CldUploadWidget>
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          disabled
        />
        <Button onClick={handleCopy}>
          {copied ? (
            <ClipboardCheck className="w-4 h-4" />
          ) : (
            <Clipboard className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default UploadImage;
