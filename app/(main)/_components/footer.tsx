import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-y">
      <div className="max-w-7xl mx-auto flex flex-col items-center p-3 text-xs lg:text-sm">
        <span className="flex items-center gap-2">
          Bản quyền thuộc về ©{" "}
          <Link
            href="https://hongducdev.com/"
            className="text-green-500 hover:underline"
          >
            hongducdev
          </Link>
          <Link
            href="//www.dmca.com/Protection/Status.aspx?ID=40e26100-615b-40a0-b601-8fbf47d55f30"
            title="DMCA.com Protection Status"
            className="dmca-badge"
          >
            {" "}
            <Image
              src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=40e26100-615b-40a0-b601-8fbf47d55f30"
              alt="DMCA.com Protection Status"
              width={120}
              height={24}
            />
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
