import Link from "next/link";
import React from "react";

interface IFixBtn {
  children: React.ReactNode;
  href: string;
}
export default function FixBtn({ children, href }: IFixBtn) {
  return (
    <Link href={href}>
      <a className="fixed bottom-4 right-0 cursor-pointer rounded-full border border-transparent bg-orange-500 p-3 text-white shadow-xl transition-colors hover:bg-orange-400">
        {children}
      </a>
    </Link>
  );
}
