import { cls } from "@libs/client/utils";

interface MessageProps {
  text: string;
  mytext?: boolean;
  avatarUrl?: string;
}

export default function Message({ text, mytext, avatarUrl }: MessageProps) {
  return (
    <div
      className={cls(
        mytext ? "justify-center" : "",
        "flex items-center space-x-2"
      )}
    >
      {!mytext ? <div className="h-8 w-8 rounded-full bg-gray-400" /> : null}
      <div
        className={cls(
          mytext ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700",
          "w-1/2 rounded-full p-3 text-sm"
        )}
      >
        <p>{text}</p>
      </div>
    </div>
  );
}
