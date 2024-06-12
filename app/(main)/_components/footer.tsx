import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-y">
      <div className="max-w-7xl mx-auto flex flex-col py-12 px-3 text-xs lg:text-sm">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="">
            <h5 className="text-xl font-semibold">Bản quyền</h5>
            <div className="mt-5">
              <Link
                href="/policies"
                className="text-base font-medium hover:underline"
              >
                Thông tin về bản quyền
              </Link>
              <Link
                href="//www.dmca.com/Protection/Status.aspx?ID=40e26100-615b-40a0-b601-8fbf47d55f30"
                title="DMCA.com Protection Status"
                className="dmca-badge mt-2"
              >
                {" "}
                <Image
                  src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=40e26100-615b-40a0-b601-8fbf47d55f30"
                  alt="DMCA.com Protection Status"
                  width={120}
                  height={24}
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:flex items-center justify-center space-x-2 hidden lg:mt-10 text-center">
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
