import { useState } from "react";

interface MutationState<T> {
  mtloading: boolean;
  mtdata?: T;
  mterror?: object;
}
type MutationResult<T> = [(data: any) => void, MutationState<T>];

// api 요청 (fn), api 요청 후 데이터,상태,에러 (objects)
export default function useMt<T = any>(url: string): MutationResult<T> {
  // objects
  const [state, setState] = useState<MutationState<T>>({
    mtloading: false,
    mtdata: undefined,
    mterror: undefined,
  });

  // fn
  function mutation(data: any) {
    setState((prev) => ({ ...prev, mtloading: true }));
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setState((prev) => ({ ...prev, mtdata: data })))
      .catch((error) => setState((prev) => ({ ...prev, mterror: error })))
      .finally(() => setState((prev) => ({ ...prev, mtloading: false })));
  }

  return [mutation, { ...state }];
}
