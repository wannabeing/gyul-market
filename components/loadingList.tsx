export default function LoadingList() {
  return (
    <div className="flex flex-col justify-between border-b-0 px-5 py-7 transition ">
      {[1, 1, 1, 1, 1].map((_, i) => (
        <div key={i} className="flex space-x-5 border-b py-4">
          <div className="h-14 w-14 rounded-md bg-gray-500" />
          <div className="flex flex-col pt-1">
            <div className="rounded-md bg-gray-200 p-3" />
            <div className="mt-1 rounded-md bg-gray-200 p-3 px-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
