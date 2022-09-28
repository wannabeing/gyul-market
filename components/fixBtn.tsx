import Link from "next/link";
import React from "react";

interface IFixBtn {
  children: React.ReactNode;
  href: string;
}
export default function FixBtn({ children, href }: IFixBtn) {
  return (
    <Link href={href}>
      <a className="fixed bottom-28 right-4 rounded-full border-transparent bg-orange-500 p-4 text-white shadow-xl transition-colors hover:bg-orange-400">
        {children}
      </a>
    </Link>
  );
}
