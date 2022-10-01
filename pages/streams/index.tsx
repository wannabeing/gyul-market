import { NextPage } from "next";
import Link from "next/link";
import FixBtn from "@components/fixBtn";
import Layout from "@components/layout";
import { LiveStream } from "@prisma/client";
import useSWR from "swr";
import { timeForToday } from "@libs/client/utils";
import Image from "next/image";

interface StreamsResponse {
  ok: boolean;
  streams: LiveStream[];
}

const Streams: NextPage = () => {
  // swr, 모든 라이브스트림 데이터 조회 (GET)
  const { data: streamData } = useSWR<StreamsResponse>("/api/streams");

  return (
    <Layout title="라이브스트림" hasTabBar pageTitle="라이브스트림">
      {streamData ? (
        <div className="space-y-4 divide-y-2 py-5">
          {streamData.streams.map((stream) => (
            <Link key={stream.id} href={`/streams/${stream.id}`}>
              <a className="block px-5 pt-4 hover:font-bold hover:text-orange-500">
                <div className="relative aspect-video w-full overflow-hidden rounded-md bg-gray-400 shadow-sm">
                  {stream.streamId ? (
                    <Image
                      src={`https://videodelivery.net/${stream.streamId}/thumbnails/thumbnail.jpg?height=320`}
                      layout="fill"
                      alt="thumbnail"
                    />
                  ) : (
                    <div className="bg-gray-200-200 flex h-full items-center justify-center font-bold text-gray-700">
                      방송중이 아닙니다. 😅
                    </div>
                  )}
                </div>

                <div className="mx-1 mt-2 flex items-center justify-between">
                  <h3 className=" text-lg">{stream.name}</h3>
                  <span className="text-sm text-gray-400">
                    {timeForToday(stream.created) + ""}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        // 로딩
        <div className="space-y-4 divide-y-2 py-5">
          <div className="block px-5 pt-4">
            <div className="aspect-video w-full rounded-md bg-gray-500 shadow-sm" />
            <div className="mt-4 w-full rounded-md bg-gray-200 p-5"></div>
          </div>
        </div>
      )}
      {/* 라이브스트림 생성 버튼 */}
      <FixBtn href="/streams/create">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </FixBtn>
    </Layout>
  );
};

export default Streams;
