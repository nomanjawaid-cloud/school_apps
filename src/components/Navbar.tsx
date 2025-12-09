"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="relative w-full bg-white h-18 px-6 flex items-center justify-between shadow-lg shadow-gray-700">
      <div className="flex items-center gap-4">
        <Link href="#">
          <Image
            src="/pic-2.webp"
            alt="Left Icon"
            width={40}
            height={40}
            className="cursor-pointer object-contain hover:scale-110 transition"
          />
        </Link>

        <div className="flex flex-col ml-20">
          <h1 className="text-xl font-bold text-gray-800 leading-none">
            Noman Senior School
          </h1>
          <p className="text-lg text-black leading-none mt-3 text-center font-medium">
            Chris Test Demo v1
          </p>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <Image
          src="/main-logo1.png"
          alt="Transcend Logo"
          width={240}
          height={64}
          className="object-contain h-26 w-auto "
        />
      </div>
      <Link href="#">
        <Image
          src="/pic-1.avif"
          alt="Right Icon"
          width={32}
          height={32}
          className="cursor-pointer object-contain hover:scale-110 transition"
        />
      </Link>
    </nav>
  );
}
