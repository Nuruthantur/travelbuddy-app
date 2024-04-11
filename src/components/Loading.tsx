import React from "react";
import Image from "next/image";
import animation from "@/img/animation.png";

function Loading() {
  return (
    <div className="details h-screen flex items-center justify-center">
      <Image src={animation} alt="travel" style={{ width: "100px" }} priority />
    </div>
  );
}

export default Loading;
