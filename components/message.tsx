import { cls } from "@libs/client/utils";

interface MessageProps {
  text: string;
  mytext: boolean;
  avatarUrl?: string;
}

export default function Message({ text, mytext, avatarUrl }: MessageProps) {
  return (
    <div
      className={cls(
        mytext ? "justify-end" : "",
        "flex items-center space-x-2"
      )}
    >
      {!mytext ? <div className="h-8 w-8 rounded-full bg-gray-400" /> : null}
      <div
        className={cls(
          mytext ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700",
          "flex h-12 w-1/2 items-center justify-start rounded-lg p-3 text-sm"
        )}
      >
        <p className="">{text}</p>
      </div>
    </div>
  );
}
