// import getBase64 from "@/utils/imagetobase64";
// import React, { ChangeEvent } from "react";

// type Props = {

//   setFormData: React.Dispatch<React.SetStateAction<string>>;
// };

// const ImageInput = ({ setFormData }: Props) => {
//   const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
//     console.log("e target", e.target.files?.[0]);
//     const file = e.target.files?.[0];
//     if (file) {
//       const base64 = (await getBase64(file)) as string;
//       console.log("base64", base64);

//       setFormData(typeof base64 === "string" ? base64 : "");

//     }
//   };
//   return (
//     <input
//       id="dropzone-file"
//       type="file"
//       className="hidden"
//       onChange={handleFileSelect}
//     />
//     //       <div>
//     //   <input type="file" onChange={handleFileSelect} />
//     // </div>
//   );
// };

// export default ImageInput;
