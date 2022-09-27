// 사용자의 위치를 구하는 Hook

import { useEffect, useState } from "react";

interface IUseLocation {
  latitude: number | null;
  longitude: number | null;
}

export default function useLocation() {
  const [location, setLocation] = useState<IUseLocation>({
    latitude: null,
    longitude: null,
  });

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setLocation({ latitude, longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);
  return location;
}
