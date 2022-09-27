import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }: AppProps) {
  // SWR fetcher function
  const fetcher = async (url: string) => {
    const response = await (await fetch(url)).json();
    return response;
  };
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <div className="mx-auto w-full max-w-lg">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
