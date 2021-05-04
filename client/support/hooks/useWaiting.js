import {useState} from 'react';

function useWaiting(func) {
  const [waiting, setWaiting] = useState(false);
  
  const waitingFunc = async (...args) => {
    if (waiting) return;
    setWaiting(true);
    try {
      const result = await func(...args);
      setWaiting(false);
      return result;
    } catch (e) {
      setWaiting(false);
      throw e;
    }
  };
  
  return [waiting, waitingFunc];
}

export default useWaiting;
