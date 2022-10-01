interface IProps {
  content: string;
}

export const CopyClipboard = (props: IProps) => {
  return (
    <div className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 hover:cursor-pointer hover:text-orange-400 active:translate-y-1 active:text-orange-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        onClick={() => navigator.clipboard.writeText(props.content)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
    </div>
  );
};
