import {useCallback, useState} from "react";

export type UseLocationType = {
  successCallback: (position: GeolocationPosition) => void;
  errorCallback: (positionError: GeolocationPositionError) => void;
  position?: PositionOptions;
}

export default function useLocation(options: UseLocationType) {

  const [watchId, setWatchId] = useState<number>(0);

  const ask = useCallback(() => {
    navigator.geolocation.getCurrentPosition(options.successCallback, options.errorCallback, options.position);
  }, [options]);

  const watch = useCallback(() => {
    setWatchId(navigator.geolocation.watchPosition(options.successCallback, options.errorCallback, options.position))
  }, [options]);

  const stop = useCallback(() => {
    navigator.geolocation.clearWatch(watchId)
  }, [watchId]);

  return {
    ask,
    watch,
    stop,
  }
}