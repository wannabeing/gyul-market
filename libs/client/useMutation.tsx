import { useState } from "react";

interface IMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type TMustation<T> = [(data: any) => void, IMutationState<T>];

export default function useMutation<T = any>(url: string): TMustation<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);

  const mutation = (data: any) => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json().catch(() => {}))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };
  return [mutation, { loading, data, error }];
}
