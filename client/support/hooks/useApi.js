import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { clientFetch } from '@/support/utils/request';

// TODO (DRAFT)
export default function useApi(path, options) {
  const {
    data,
    mutate,
    error
  } = useSWR(path, clientFetch, options);
  
  const [loading, setLoading] = useState(true);
  const [allowReturn, setAllowReturn] = useState(false);
  
  let time = useRef(0);
  
  function update(...args) {
    setLoading(true);
    setAllowReturn(false);
    
    clearTimeout(time.current);
    time.current = setTimeout(() => {
      setAllowReturn(true);
    }, 1000);
    
    return mutate(...args);
  }
  
  const [exposingData, setExposingData] = useState();
  
  let last = useRef('init'); // TODO (DRAFT)
  useEffect(() => {
    if (last.current === 'init' || (JSON.stringify(data) !== JSON.stringify(last.current))) {
      setLoading(true);
      const shouldExpose = last.current !== 'init';
      
      last.current = data;
      
      clearTimeout(time.current);
      time.current = setTimeout(() => {
        if (shouldExpose) {
          setExposingData(last.current);
        }
        setAllowReturn(true);
        setLoading(false);
      }, 400);
    }
  
  }, [data]);
  
  // TODO (DRAFT)
  console.log({
    data,
    exposingData,
    error,
    loading,
    allowReturn,
    last: last.current
  });
  
  return {
    data: exposingData,
    update,
    error,
    loading: loading && allowReturn
  };
}
