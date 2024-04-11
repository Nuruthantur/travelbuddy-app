import Link from "next/link";
import React from "react";
import { CiHeart, CiHome, CiSettings, CiUser } from "react-icons/ci";

function Navbar() {
  return (
    <div className="btm-nav ">
      <button className="bg-white text-black">
        <div className="flex gap-10">
          <Link href="/dashboard">
            <CiHome />
          </Link>
        </div>
      </button>
      <button className="bg-white text-pink-600">
        <div className="flex gap-10">
          <Link href="/likes">
            <CiHeart />
          </Link>
        </div>
      </button>
      <button className="bg-white text-black border-l border-gray-400">
        <div className="flex gap-10">
          <Link href="/settings/profile">
            <CiUser />
          </Link>
        </div>
      </button>
      <button className="bg-white text-black">
        <div className="flex gap-10">
          <Link href="/settings">
            <CiSettings />
          </Link>
        </div>
      </button>
    </div>
  );
}

export default Navbar;
