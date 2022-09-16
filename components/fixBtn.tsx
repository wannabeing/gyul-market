import Link from "next/link";
import React from "react";

interface IFixBtn {
  children: React.ReactNode;
  href: string;
}
export default function FixBtn({ children, href }: IFixBtn) {
  return (
    <Link href={href}>
      <a className="fixed bottom-20 right-5 cursor-pointer rounded-full border border-transparent bg-orange-400 p-5 text-white shadow-xl transition-colors hover:bg-orange-500">
        {children}
      </a>
    </Link>
  );
}
