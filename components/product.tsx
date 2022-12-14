import Link from "next/link";
import { getImgSrc, timeForToday } from "@libs/client/utils";
import Image from "next/image";

interface ItemProps {
  title: string;
  id: number;
  price: number;
  likes: number;
  imgUrl?: string;
  createdAt: Date;
}

export default function Item({
  title,
  id,
  price,
  likes,
  imgUrl,
  createdAt,
}: ItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <a className="flex cursor-pointer justify-between border-b-0 px-5 py-5 transition hover:bg-gray-200">
        <div className="flex space-x-5">
          {imgUrl ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-md border border-gray-400 p-1">
              <div className="relative h-12 w-12">
                <Image
                  src={getImgSrc(imgUrl, "avatar")}
                  className="object-contain"
                  layout="fill"
                  alt="product"
                />
              </div>
            </div>
          ) : (
            <div className="h-14 w-14 rounded-md bg-gray-500" />
          )}
          <div className="flex flex-col">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <span className="text-xs text-gray-600">
              {timeForToday(createdAt) + ""}
            </span>
            <span className="mt-1 font-bold text-gray-900">
              ${price.toLocaleString("en")}
            </span>
          </div>
        </div>
        <div className="flex items-end justify-end space-x-2">
          {/* likes */}
          <div className="flex items-center space-x-0.5 text-sm">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{likes}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
