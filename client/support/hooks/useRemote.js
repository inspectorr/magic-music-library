import {useState} from 'react';
import {useForm} from 'react-hook-form';
import useWaiting from '@/support/hooks/useWaiting';

const defaultOptions = {
  onSuccess: (result) => {},
  onFailure: (message) => {},
  minWait: 0,
  resetOnRequest: true,
};

function useRemote(
  func = async () => {},
  options = defaultOptions,
  formOptions = {}
) {
  const {
    handleSubmit,
    register,
    errors,
    clearErrors,
    ...api
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    ...formOptions
  });
  
  const formApi = {
    handleSubmit,
    register,
    errors,
    ...api
  }
  
  options = { ...defaultOptions, ...options };
  
  const [waiting, waitingFunc] = useWaiting(request);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  function reset() {
    setSuccess(false);
    setError(null);
  }
  
  async function request(...args) {
    clearErrors();
    reset();
    
    try {
      const [result] = await Promise.all([
        func(...args),
        wait(options.minWait)
      ]);
      setSuccess(true);
      await options.onSuccess(result);
      return result;
    } catch (error) {
      console.error('[Remote Error]', { error });
      const handled = new Error(error?.response?.data?.message);
      setError(handled);
      options.onFailure(handled);
    }
  }
  
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  return {
    request: waitingFunc,
    waiting,
    error,
    success,
    reset,
    formApi
  };
}

export default useRemote;
