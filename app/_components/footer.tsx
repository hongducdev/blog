import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-y">
      <div className="max-w-7xl mx-auto flex flex-col items-center p-3 text-xs lg:text-sm">
        <span className="">
          Copyright ©{" "}
          <Link
            href="https://hongducdev.com/"
            className="text-green-500 hover:underline"
          >
            hongducdev
          </Link>
        </span>
        <div className="lg:flex items-center space-x-2 hidden">
          <p>Powered by</p>
          <Link
            href="https://nextjs.org/"
            className="text-green-500 hover:underline"
          >
            Next.js
          </Link>
          ,
          <Link
            href="https://tailwindcss.com/"
            className="text-[#38bdf8] hover:underline"
          >
            Tailwind CSS
          </Link>
          <p>and</p>
          <Link
            href="https://www.typescriptlang.org/"
            className="text-[#3178c6] hover:underline"
          >
            TypeScript
          </Link>
          <div className="shrink-0 bg-border w-[1px] h-5"></div>
          <Link href="https://github.com/hongducdev/blog">
            Github Repository
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
