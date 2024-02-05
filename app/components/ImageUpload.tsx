"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

const uploadPreset = "rs1vejui";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  userPhoto: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  userPhoto,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="
              hover:opacity-95
              transition
              
              mx-auto
              rounded-full w-32 h-32 bg-black self-center relative bg-opacity-30 cursor-pointer flex justify-center items-center
            "
          >
            <TbPhotoPlus size={50} className="text-white absolute" />
            {value && (
              <div
                className="
              absolute inset-0 w-full h-full"
              >
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-32 w-32 self-center rounded-full object-cover cursor-pointer -z-10 absolute"
                  src={value}
                  alt="House"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
