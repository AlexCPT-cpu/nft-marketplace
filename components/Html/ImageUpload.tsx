import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onChange: (base64: File) => void;
  label?: string;
  value?: string;
  disabled?: boolean;
}

const ImageUpload: React.FC<DropzoneProps> = ({ onChange }) => {
  const [base64, setBase64] = useState<null | string | File>(null);
  const [image, setImage] = useState('');

  const imgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setBase64(i);
      onChange(i)
      setImage(URL.createObjectURL(i));
    }
  }

  return (
    <div className="w-full dark:bg-[#041824] h-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700">
      <input type="file" name="myImage" onChange={imgChange} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image
            src={image}
            height="100"
            width="100"
            alt="Uploaded image"
            className="w-52 dark:bg-[#041824]"
          />
        </div>
      ) : null}
    </div>
  );
}
 
export default ImageUpload;