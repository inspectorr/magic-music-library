import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import { clientFetch } from '@/support/utils/request';

const ENABLE_MIN_LOAD = false;
const DEFAULT_MIN_LOAD_TIME = 500;

export default function useApi(
  path,
  options = {
    enableMinLoad: ENABLE_MIN_LOAD,
    minLoadTime: DEFAULT_MIN_LOAD_TIME,
  }
) {
  const {
    enableMinLoad = ENABLE_MIN_LOAD,
    minLoadTime = DEFAULT_MIN_LOAD_TIME,
  } = options;
  
  const {
    data,
    mutate,
    error
  } = useSWR(path, clientFetch);
  
  const [loading, setLoading] = useState(true);
  const [allowReturn, setAllowReturn] = useState(false);
  
  const time = useRef(0);
  const isForceUpdating = useRef(false);
  
  function update(...args) {
    setLoading(true);
    isForceUpdating.current = true;
    
    if (enableMinLoad) {
      setAllowReturn(false);
      delayedCall(() => {
        setAllowReturn(true);
      });
    }
    
    return mutate(...args);
  }
  
  function delayedCall(func = () => {}) {
    clearTimeout(time.current);
    time.current = setTimeout(func, minLoadTime);
  }
  
  const [exposingData, setExposingData] = useState();
  
  function shouldUpdateWith(data) {
    return JSON.stringify(data) !== JSON.stringify(exposingData);
  }
  
  useEffect(() => {
    if (shouldUpdateWith(data)) {
      if (!loading) {
        setLoading(true);
      }
      
      function finishLoading() {
        setExposingData(data);
        setAllowReturn(true);
        setLoading(false);
      }
      
      if (isForceUpdating.current || !enableMinLoad) {
        finishLoading();
        return;
      }
      
      delayedCall(finishLoading);
    }
    
    isForceUpdating.current = false;
  }, [data]);
  
  return {
    data: exposingData,
    update,
    error,
    loading: loading && allowReturn
  };
}
