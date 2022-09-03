import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="grid min-h-screen gap-10 bg-slate-400 py-20 px-5 xl:grid-cols-3 xl:place-content-center">
      <div className="rounded-3xl bg-white p-10 shadow-xl dark:bg-black">
        <span className="text-xl font-semibold">Select Item</span>
        <ul>
          {[1, 2].map((i) => (
            <div className="flex justify-between" key={i}>
              <span className=" text-gray-500">Grey Chair</span>
              <span className="font-semibold">$10</span>
            </div>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t-2 border-dashed pt-2">
          <span>Total</span>
          <span className="font-semibold">$20</span>
        </div>
        <button className="mx-auto mt-5 flex w-1/2 items-center justify-center rounded-lg bg-blue-500 p-3 text-center text-white ">
          CHECK OUT
        </button>
      </div>
      <div className="group overflow-hidden  rounded-3xl bg-white shadow-xl">
        <div className=" bg-blue-500 p-6 pb-14">
          <span className="text-xl text-white">Profile</span>
        </div>
        <div className="relative -top-5 rounded-3xl bg-white p-6">
          <div className="relative -top-16 flex items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Order</span>
              <span className="font-bold">340</span>
            </div>
            <div className="h-24 w-24 rounded-full bg-orange-400 transition group-hover:bg-red-200" />
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500">Spent</span>
              <span className="font-bold">$3,210</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span>Tony ddd</span>
            <span>New York, USA</span>
          </div>
        </div>
      </div>
      <div className="rounded-2xl bg-white p-10 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <span>⬅</span>
          <div className="space-x-3">
            <span>5.5</span>
            <span className="rounded-md p-2 shadow-2xl">♥️</span>
          </div>
        </div>
        <div className="mb-5 h-80 rounded-md bg-zinc-500" />
        <div className="flex flex-col">
          <span className="font-sans text-xl font-bold">Swoon Lounge</span>
          <span className="font-sans text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex items-center justify-between">
            <div className="space-x-2.5">
              <button className="h-5 w-5 rounded-full bg-yellow-500 ring-yellow-500 ring-offset-2 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-indigo-500 ring-indigo-500 ring-offset-2 transition focus:ring-2" />
              <button className="h-5 w-5 rounded-full bg-teal-500 ring-teal-500 ring-offset-2 transition focus:ring-2" />
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex aspect-square w-8 items-center justify-center rounded-md bg-blue-100 p-3 text-2xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="flex aspect-square w-8 items-center justify-center rounded-md bg-blue-100 p-3 text-2xl text-gray-500">
                +
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-2xl font-bold">$360</span>
            <button className="rounded-md bg-blue-500 p-3 text-white">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
