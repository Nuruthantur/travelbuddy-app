import getBase64 from "@/utils/imagetobase64";
import React, { ChangeEvent } from "react";

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
};

const ImageInput = ({ state, setState }: Props) => {
  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e target", e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (file) {
      const base64 = (await getBase64(file)) as string;
      console.log("base64", base64);

      setState(typeof base64 === "string" ? base64 : "");
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
    </div>
  );
};

export default ImageInput;
