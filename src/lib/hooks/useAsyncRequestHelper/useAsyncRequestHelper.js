import { useState, useEffect } from 'react';

export default ({ loading = false, error = null, onSuccess = null, onFailure = null, enableLog = false }) => {
  const [status, setStatus] = useState(null); // null > request > success / failure

  const onRequest = () => {
    if (enableLog) log('REQUEST', loading, error, onSuccess, onFailure);
    setStatus('REQUEST');
  };

  useEffect(() => {
    if (!status) {
      return;
    }

    if (status === 'REQUEST' && loading) {
      return;
    }

    if (status === 'REQUEST' && !loading) {
      if (error) {
        if (onFailure) onFailure();
        if (enableLog) log('REQUEST', loading, error, onSuccess, onFailure);
        setStatus('FAILURE');
      } else {
        if(onSuccess) onSuccess();
        if (enableLog) log('REQUEST', loading, error, onSuccess, onFailure);
        setStatus('SUCCESS');
      }
    }
  }, [status, loading, error, onSuccess, onFailure, enableLog]);

  return [status, onRequest];
};

const log = (...rest) => console.log(rest);
